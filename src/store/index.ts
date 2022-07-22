import { defineStore } from 'pinia'
import { filter } from 'lodash/fp'

export const useInputStore = defineStore('input', {
  state: () => ({ 
    inputWords: Array(7),
    validWords: [] as string[],
    count: 0 
  }),
  getters: {
    double: state => state.count * 2,
    inputs: state => state.inputWords,
    validInputs: state => state.validWords,
    targetWord: state => state.validWords[state.validWords.length-1]
  },
  actions: {
    increment() {
      this.count++
    },
    setValidWords(inputWords: string[]) {
      this.validWords = filter( word => /^[a-zA-Z.]{5}$/.test(word), inputWords)
    },
  },
})

