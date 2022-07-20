import { defineStore } from 'pinia'
import { words } from '@/assets/wordle_words'

export const useJourneyStore = defineStore('journey', {
  state: () => ({ 
    count: 0,
    guesses: [],
    wordBank: words,
    wordleMap: new WordleMap(words)
  }),
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})


class WordleMap {
  words: Array<string>
  alphabet: Array<string>

  constructor(words: Array<string>) {
    this.words = words;
    this.alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    // iterate through other things
  }

  

  mapSingleLetters() {
    const singleMap = {}
    for (const word of this.words){
      for (const [i, char] of [...word].entries()){
        
      }
    }
  }



}

// let wordleMap = new WordleMap(words)

// DO it ... for each number of letters ...? 
// by what indexes they're at 

// 1len ... g: -1, 0, 1, 2, 3, 4
// 2len ... gg: -1, (0, 1), (2, 4)
// ... ggg

// etc. 