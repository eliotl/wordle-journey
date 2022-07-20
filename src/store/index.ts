import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', {
  state: () => ({ 
    inputWords: Array(7),
    targetWord: "",
    count: 0 
  }),
  getters: {
    double: state => state.count * 2,
    inputs: state => state.inputWords,
    lastInput: state => state.inputWords[state.inputWords.length-1]
  },
  actions: {
    increment() {
      this.count++
    },
    setWord(index: number, word: string) {
      this.inputWords[index] = word;
    },
    setTargetWord(word: string) {
      this.targetWord = word;
    },
  },
})

