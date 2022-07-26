<template lang="pug">
div(:class="color")
    span.guess-span {{letter}}
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { GuessSquare } from '@/data/wordleMap';

@Options({
  props: {
    square: {} as PropType<GuessSquare>,
  }
})
export default class LetterSquare extends Vue {
  square!: GuessSquare;

  get color() {
    return this.square.color;
  }
  get letter() {
    return this.square.letter;
  }

  
}

</script>

<style scoped>
.green{
    background: #6aaa64;
}
.yellow{
    background: #c9b458;
}
.grey{
    background: #86888a;
}
.white{
    background: #FFFFFF;
    border: 1px solid black;
}

div{
    width: 2em;
    height: 2em;
}

span.guess-span{
    font-size: 1.3em;
    font-weight: bold;
    font-family: sans-serif;
    color: white;
    font-style: bold;
    text-transform: uppercase;
    display: inline-table;
}

@media only screen and (max-width: 700px) {
  div {
    width: 2rem;
    height: 2rem;
  }
  span.guess-span {
    font-size: 1.35rem;
  }
  
}

</style>
