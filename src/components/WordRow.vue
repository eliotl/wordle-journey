<template lang="pug">
div.parent-row
  div.row
    div.wordCloud
    div.square
    div.column(v-for="square in guessSquares")
      LetterSquare(:square="square")
    div.square
      span.remainder {{ remainder }}
    div.wordCloud
      span.words(v-if="showWords") {{displayWords}}
</template>

<script lang="ts">

import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import LetterSquare from './LetterSquare.vue';
import { GuessRow } from '@/data/wordleMap';

import { shuffle } from 'lodash/fp';

@Options({
  components: {
    LetterSquare,
  },
  props: {
    result: {} as PropType<GuessRow>,
    showWords: Boolean,
  }
})
export default class WordRow extends Vue {
  result!: GuessRow;
  showWords!: boolean;

  get guessSquares() {
    return this.result.squares;
  }

  get wordsLeft() {
    return this.result.words;
  }
  
  get remainder() {
    return this.result.remainder;
  }

  /**
   * Shows a random array of five or fewer words that were still possible
   * after the current guess.
   */
  get displayWords() {
    const words = shuffle(this.wordsLeft).slice(0,5)
    let wordString = words.join(", ")
    if (this.wordsLeft.length > words.length) {
      wordString = wordString.concat('…')
    }
    return wordString
  }

}
</script>

<style scoped>
.parent-row{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
.row {
  display: table;
  table-layout: fixed;
  border-spacing: 0.25em;
}
.column {
  display: table-cell;
}

.square {
  width: 1.5em;
  height: 1.5em;  
  display: table-cell;
  vertical-align: middle;
}

.words{
  font-family: Arial, Helvetica, sans-serif;
}

.wordCloud {
  width: 20em;
  font-size: 0.8em;
  vertical-align: middle;
  text-align: left;
  display: table-cell;
}

span.remainder{
  font-size: 1em;
  font-family: sans-serif;
  text-align: center;
}

</style>