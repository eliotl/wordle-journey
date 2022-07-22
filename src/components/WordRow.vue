<template lang="pug">
div.parent-row
  div.row
    div.column(v-for="square in guessSquares")
      LetterSquare(:square="square")
  p {{ remainder }}
  p(v-if="showWords") {{displayWords}}
</template>

<script lang="ts">

import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import LetterSquare from './LetterSquare.vue';
import { useJourneyStore, GuessRow } from '@/store/journey';

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
  
  get store ()  {
    return useJourneyStore();
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
</style>