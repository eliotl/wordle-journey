import { defineStore } from 'pinia'
import { words } from '@/assets/wordle_words'
import { Dictionary, result } from 'lodash'
import { filter, map, lowerCase, difference, intersection } from 'lodash/fp'

export const useJourneyStore = defineStore('journey', {
  state: () => ({ 
    inputWords: Array(7),
    guessWords: [] as Array<string>,
    resultRows: [] as Array<GuessRow>,
    wordleMap: new WordleMap(words)
  }),
  getters: {
    inputs: state => state.inputWords,
    guesses: state => state.guessWords,
    targetWord: state => state.guessWords[state.guessWords.length - 1],
    results: state => state.resultRows,
  },
  actions: {
    setGuesses(guessWords: Array<string>) {
      this.guessWords = guessWords
    },
    setValidWords(inputWords: Array<string>) {
      this.guessWords = map(lowerCase)(filter( word => /^[a-zA-Z.]{5}$/.test(word), inputWords))
    },
    runWords(){
      for (const guess of this.guesses){
        this.runSingleWord(guess)
      }
    },
    runSingleWord(guessWord: string){
      const guessSquares: Array<GuessSquare> = []
      for (const [i, char] of [...guessWord].entries()){
        const result = this.wordleMap.compareLetter(char, i, this.targetWord)
        this.wordleMap.updateSingleResult(result, char, i)
        guessSquares.push({'color': result, 'letter': char})
      }
      this.resultRows.push({
        'squares': guessSquares,
        'words': this.wordleMap.wordsLeft,
        'remainder': this.wordleMap.wordsLeft.length.toString(),
        'emojis': ''
      })
    },
  },
})


enum Color {
  green = "green",
  yellow = "yellow",
  grey = "grey",
}

export interface GuessSquare {
  color: Color;
  letter: string;
}

export interface GuessRow {
  squares: Array<GuessSquare>;
  words: Array<string>;
  remainder: string;
  emojis: string;
}


class WordleMap {
  words: Array<string>
  alphabet: Array<string>
  singleMap: Dictionary<Dictionary<Array<string>>> = {}
  wordsLeft: Array<string>
  // doubleMap: Dictionary<Dictionary<Set<string>>> = {}

  constructor(words: Array<string>) {
    this.words = words;
    this.alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    this.mapSingleLetters()
    this.wordsLeft = [...words]
    // debugger; // eslint-disable-line no-debugger
  }
  
  /**
   * Populates an object mapping each letter at each index
   * to every valid word in Wordle that contains it
   * @example
   * // this.singleMap['a'][0] = ["abyss", "actor", "adult", "algae", ...]
   * // this.singleMap['g'][2] = ["algae", "bagel", "cigar", "eagle", ...]
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

  // mapDoubleLetters() {
  //   for (const word of this.words){
  //     const foo: {} = {};
  //     const doubleMap: Dictionary<Set<number>> = {}
  //     for (const [i, char] of [...word].entries()){
  //       const restOfWord = word.slice(0,i) + word.slice(i+1, word.length - 1);
  //       if (restOfWord.includes(char)){
  //         char in doubleMap ? doubleMap[char].add(i) : doubleMap[char] = new Set([i])
  //       }
  //     }
  //     for (const [char, indexes] of Object.entries(doubleMap)){
  //       if (indexes.size == 2){
  //         this.doubleMap[]
  //       }
  //     }
  //   }  
  // }


}
