import { defineStore } from 'pinia'
import { words } from '@/assets/wordle_words'
import { Dictionary, result } from 'lodash'
import { filter, map, lowerCase, difference, intersection } from 'lodash/fp'

export const useJourneyStore = defineStore('journey', {
  state: () => ({ 
    count: 0,
    inputWords: Array(7),
    guessWords: [] as Array<string>,
    resultRows: [] as Array<GuessRow>,
    wordleMap: new WordleMap(words)
  }),
  getters: {
    inputs: state => state.inputWords,
    double: state => state.count * 2,
    guesses: state => state.guessWords,
    targetWord: state => state.guessWords[state.guessWords.length - 1],
    results: state => state.resultRows,
  },
  actions: {
    increment() {
      this.count++
    },
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

  updateGrey(letter: string){
    const invalidWords = this.singleMap[letter][-1]
    this.wordsLeft = difference(this.wordsLeft, invalidWords)
  }

  updateYellow(letter: string, index: number){
    const invalidWords = this.singleMap[letter][index]
    const validWords = difference(this.singleMap[letter][-1], invalidWords)
    this.wordsLeft = intersection(validWords, this.wordsLeft)
  }

  updateGreen(letter: string, index: number){
    const validWords = this.singleMap[letter][index]
    this.wordsLeft = intersection(validWords, this.wordsLeft)
  }

  compareLetter(letter: string, index: number, targetWord: string){
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
