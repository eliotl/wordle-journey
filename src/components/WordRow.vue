<template lang="pug">
div.parent-row
  div.row
    div.column(v-for="letter in letters")
      LetterSquare(:letter="letter")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LetterSquare from './LetterSquare.vue';

@Options({
  components: {
    LetterSquare,
  },
  props: {
    word: String,
    target: String, 
  }
})
export default class WordRow extends Vue {
  word!: string;
  target!: string;

  get letters() {
    return [...this.word]
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