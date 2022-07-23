<template lang="pug">
div.parent-row
  div.row
    //- div.wordCloud
    div.square
    div.column(v-for="square in guessSquares")
      LetterSquare(:square="square")
    div.square
      span.remainder {{ remainder }}
    div.wordCloud(v-if="showWords")
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
  display: inline-block;
  align-items: right;
  justify-content: right;

}
.row {
  display: flex;
  flex-direction: row;
  border-spacing: 0.25em;
  align-items: center;
  justify-content: center;

}
.column {
  margin: 2px;
}

.square {
  width: 1.5em;
  height: 1.5em;  
  margin: 2px;
}

.words{
  font-family: Arial, Helvetica, sans-serif;
}

.wordCloud {
  max-width: 10em;
  width: 10em;
  font-size: 0.8em;
  vertical-align: middle;
  text-align: left;
  display: flex;
  margin: 2px;

}

span.remainder{
  font-size: 1em;
  font-family: sans-serif;
  text-align: center;
  vertical-align: middle;
}

</style>