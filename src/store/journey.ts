import { defineStore } from 'pinia'
import { words } from '@/assets/wordle_words'
import { Dictionary } from 'lodash'
import { filter, map, toLower, difference, intersection, pickBy } from 'lodash/fp'

export const useJourneyStore = defineStore('journey', {
  state: () => ({ 
    _inputWords: Array(7),
    _guessWords: [] as string[],
    _resultRows: [] as GuessRow[],
    _wordleMap: new WordleMap(words),
    _displayModal: false,
  }),
  getters: {
    inputs: state => state._inputWords,
    guesses: state => state._guessWords,
    targetWord: state => state._guessWords[state._guessWords.length - 1],
    results: state => state._resultRows,
    displayModal : state => state._displayModal,
  },
  actions: {
    setValidWords(_inputWords: string[]) {
      this._guessWords = map(toLower)(filter( word => /^[a-zA-Z.]{5}$/.test(word), _inputWords))
    },
    resetState(){
      this._wordleMap = new WordleMap(words)
      this._resultRows = []
    },
    assembleEmojis(guessSquares: GuessSquare[], remainder: string) {
      const emojis = map( (o: GuessSquare) => emojiMapping[o.color] )(guessSquares)
      emojis.push(' ')
      emojis.push(remainder)
      return emojis.join("")
    },
    runWords(){
      for (const guess of this.guesses){
        this.runSingleWord(guess)
      }
      this._resultRows[this._resultRows.length-1].remainder = '✅'
      this._resultRows[this._resultRows.length-1].emojis = this.assembleEmojis(this._resultRows[this._resultRows.length-1].squares, '✅')
    },
    /**
     * Check the result of guessing one word and update the results of this._resultRows
     * @param {string} guessWord The word a user guessed
     */
    runSingleWord(guessWord: string){
      let guessSquares: GuessSquare[] = []
      for (const [i, char] of [...guessWord].entries()){
        const result = this._wordleMap.compareLetter(char, i, this.targetWord)
        this._wordleMap.updateSingleResult(result, char, i)
        guessSquares.push({'color': result, 'letter': char})
      }

      guessSquares = this._wordleMap.handleRepeatLetters(guessWord, this.targetWord, guessSquares)
      const remainder = this._wordleMap.wordsLeft.length.toString()
      const emojis = this.assembleEmojis(guessSquares, remainder)

      this._resultRows.push({
        'squares': guessSquares,
        'words': this._wordleMap.wordsLeft,
        'remainder': remainder,
        'emojis': emojis
      })
    },
    hideModal(){
      this._displayModal = false;
    },
    showModal(){
      this._displayModal = true;
    },
  },
})


enum Color {
  green = "green",
  yellow = "yellow",
  grey = "grey",
}

enum EmojiColor {
  green = "🟩",
  yellow = "🟨",
  grey = "⬜️",
}

const emojiMapping: Dictionary<string> = {
    green: "🟩",
    yellow: "🟨",
    grey: "⬜️",
}

export interface GuessSquare {
  color: Color;
  letter: string;
}

export interface GuessRow {
  squares: GuessSquare[];
  words: string[];
  remainder: string;
  emojis: string;
}


class WordleMap {
  words: string[]
  alphabet: string[]
  singleMap: Dictionary<Dictionary<string[]>> = {'.': {'-1': []}}
  repeatMap: Dictionary<Dictionary<string[]>> = {'.': {'-1': []}}
  wordsLeft: string[]

  constructor(words: string[]) {
    this.words = words;
    this.alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    this.mapSingleLetters()
    this.mapRepeatLetters()
    this.wordsLeft = [...words]
  }
  
  /**
   * Populates an object mapping each letter at each index
   * to every valid word in Wordle that contains it. Index -1 contains all
   * words that contain the letter.
   * @example
   * // this.singleMap['a'][0] = ["abyss", "actor", "adult", "algae", ...]
   * // this.singleMap['g'][2] = ["algae", "bagel", "cigar", "eagle", ...]
   * // this.singleMap['0'][-1] = ["actor", "brook", "often", "salvo", ...]
   */
  mapSingleLetters() {
    for (const word of this.words){
      for (const [i, char] of [...word].entries()){
        if (!(char in this.singleMap)){
          this.singleMap[char] = {}
        }
        if (!(i in this.singleMap[char])){
          this.singleMap[char][i] = []
        }
        this.singleMap[char][i].push(word)

        if (! (-1 in this.singleMap[char])) {
          this.singleMap[char][-1] = []
        }
        this.singleMap[char][-1].push(word)
      }
    }
  }

  /**
   * Populates an object mapping each letter that appears repeated
   * to every valid word in Wordle that contains it
   * @example
   * // this.repeatMap['a'][2] = ["adapt", "agora", "llama", "papal", ...]
   * // this.repeatMap['r'][3] = ["error", "rarer"]
   */
  mapRepeatLetters() {
    for (const word of this.words){
      const repeatIndexes = this.repeatLetterIndexes(word);

      for (const [char, indexes] of Object.entries(repeatIndexes)){
        const indexLen = indexes.length
        if (!(char in this.repeatMap)){
          this.repeatMap[char] = {}
        }
        if (!(indexLen in this.repeatMap[char])){
          this.repeatMap[char][indexLen] = []
        }
        this.repeatMap[char][indexLen].push(word)
      }
    }
  }


  resetWordsLeft(){
    this.wordsLeft = [...words]
  }

  /**
   * Updates the remaining valid words based on whether
   * the letter's square is grey, yellow, or green.
   */
  updateSingleResult(result: Color, letter: string, index: number) {
    if (result == Color.grey){
      this.updateGrey(letter)
    }
    else if (result == Color.yellow){
      this.updateYellow(letter, index)
    }
    else if (result == Color.green){
      this.updateGreen(letter, index)
    }
  }

  /**
   * Removes all remaining words with a given letter.
   */
  updateGrey(letter: string){
    const invalidWords = this.singleMap[letter][-1]
    this.wordsLeft = difference(this.wordsLeft, invalidWords)
  }

  /**
   * Removes all remaining words with a given letter at an index, 
   * and removes all words that don't have that letter at another index.
   */
   updateYellow(letter: string, index: number){
    const invalidWords = this.singleMap[letter][index]
    const validWords = difference(this.singleMap[letter][-1], invalidWords)
    this.wordsLeft = intersection(validWords, this.wordsLeft)
  }

  /**
   * Removes all remaining words that do not have a given letter
   * at an index.
   */
  updateGreen(letter: string, index: number){
    const validWords = this.singleMap[letter][index]
    this.wordsLeft = intersection(validWords, this.wordsLeft)
  }

  /**
   * Determines whether a guessed letter should be read as grey, green, yor yellow.
   * This result is naive to repeated letters and may be overwritten if a guess or target
   * has repeated letters.
   * @param letter 
   * @param index 
   * @param targetWord 
   * @returns {Color} The color of the guessed letter
   */
  compareLetter(letter: string, index: number, targetWord: string): Color{
    if (!(targetWord.includes(letter))){
      return Color.grey
    }
    else if (!(targetWord[index] == letter)){
      return Color.yellow
    }
    else {
      return Color.green
    }
  }

  greyRepeatedYellows(guessSquares: GuessSquare[], letter: string, quantity: number) {
    let counter = 0
    for (let i = guessSquares.length - 1; i >= 0; i--){
      const square = guessSquares[i]
      if (square.letter == letter && square.color == Color.yellow){
        square.color = Color.grey
        counter++;
      }
      if (counter >= quantity) {
        break;
      }
    }
    return guessSquares;
  }

  /**
   * Removes words from this.wordsLeft that do not have at least the 
   * given number of occurrences of a letter.
   * 
   * @param letter 
   * @param {number} len The number of occurences of a letter to filter for. Must be > 1.
   */
  updateWordsByLength(letter: string, len: number){
    const repeatMap = this.repeatMap[letter]
    const validWords: string[] = []
    for (const [repeatLen, validWordsByLen] of Object.entries(repeatMap)){
      if (parseInt(repeatLen) >= len) {
        validWords.push(...validWordsByLen)
      }
    }
    this.wordsLeft = intersection(validWords, this.wordsLeft)
  }

  handleRepeatLetters(guessWord: string, targetWord: string, guessSquares: GuessSquare[]) {
    const repeatIndexes = this.repeatLetterIndexes(guessWord);
    const targetIndexes = this.getLetterIndexes(targetWord); 
    for (const [char, indexes] of Object.entries(repeatIndexes)){
      const targetLen = char in targetIndexes ? targetIndexes[char].length : 0
      const guessLen = indexes.length

      if (guessLen > targetLen && targetLen >= 1){
        // keep targetLen & (> targetLen)
        this.updateWordsByLength(char, targetLen)
        guessSquares = this.greyRepeatedYellows(guessSquares, char, guessLen - targetLen)
        // change extra yellows to greys right to left
      }
      else if (targetLen >= guessLen && guessLen > 1){
        // keep guessLen & >>
        this.updateWordsByLength(char, guessLen)
        // kill guessLen - 1 & <<
      }
    }
    return guessSquares
  }

  /**
   * Returns a map of repeated letters to their indexes for a word
   * @param word 
   * @returns {Dictionary<number[]>} Returns the mapped letters that have repeats
   */
  repeatLetterIndexes(word: string): Dictionary<number[]> {
    const letterIndexes = this.getLetterIndexes(word);
    return pickBy( (o: number[]) =>  o.length > 1 )(letterIndexes)
  }

  /**
   * Returns a map of all letters to their indexes for a word
   * @param word 
   */
   getLetterIndexes(word: string): Dictionary<number[]> {    
    const letterMap: Dictionary<number[]> = {}
    for (const [i, char] of [...word].entries()){
      char in letterMap ? letterMap[char].push(i) : letterMap[char] = [i];
    }
    return letterMap
  }

}
