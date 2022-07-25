import { defineStore } from 'pinia'
import { words } from '@/assets/wordle_words'
import { WordleMap, GuessRow, GuessSquare, Color } from '@/data/wordleMap'
import { Dictionary } from 'lodash'
import { filter, map, toLower } from 'lodash/fp'


export const useJourneyStore = defineStore('journey', {
  state: () => ({ 
    _inputWords: Array(7),
    _guessWords: [] as string[],
    _resultRows: [] as GuessRow[],
    _wordleMap: new WordleMap(words),
    _displayModal: {[ModalName.info]: false, [ModalName.share]: false}
  }),
  getters: {
    inputs: state => state._inputWords,
    guesses: state => state._guessWords,
    targetWord: state => state._guessWords[state._guessWords.length - 1],
    results: state => state._resultRows,
    displayShareModal : state => state._displayModal[ModalName.share],
    displayInfoModal : state => state._displayModal[ModalName.info],
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
      for (const guess of this.guesses.slice(0, -1)){
        this.runSingleWord(guess)
      }
      if (this.guesses.length < 7){
        this.appendResult(this.getLastRow())
      }
    },
    appendResult(result: GuessRow){
      this._resultRows.push(result)
    },

    getLastRow(): GuessRow{
      return {
        remainder: '✅',
        emojis : '🟩🟩🟩🟩🟩 ✅',
        words : [],
        squares: map( (c: string) => Object({letter: c, color: Color.green}), [...this.targetWord])
      }
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

      this.appendResult({
        'squares': guessSquares,
        'words': this._wordleMap.wordsLeft,
        'remainder': remainder,
        'emojis': emojis
      })
    },
    hideModal(modalName: ModalName){
      this._displayModal[modalName] = false;
    },
    showModal(modalName: ModalName){
      this._displayModal[modalName] = true;
    },
  },
})

export enum ModalName {
  info,
  share,
}

const emojiMapping: Dictionary<string> = {
  green: "🟩",
  yellow: "🟨",
  grey: "⬜️",
}
