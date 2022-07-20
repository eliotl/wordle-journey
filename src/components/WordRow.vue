<template lang="pug">
div.parent-row
  div.row
    div.column(v-for="square in guessSquares")
      LetterSquare(:square="square")
  p {{ remainder }}
</template>

<script lang="ts">

import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import LetterSquare from './LetterSquare.vue';
import { useJourneyStore, GuessRow } from '@/store/journey';

@Options({
  components: {
    LetterSquare,
  },
  props: {
    result: {} as PropType<GuessRow>,
  }
})
export default class WordRow extends Vue {
  result!: GuessRow;

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
  table-layout: fixed; /*Optional*/
  border-spacing: 0.25em; /*Optional*/
}
.column {
  display: table-cell;
}
</style>