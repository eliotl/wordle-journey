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
    width: 1.5em;
    height: 1.5em;
}

span.guess-span{
    font-size: 1.25em;
    font-family: sans-serif;
    color: white;
    font-style: bold;
    text-transform: uppercase;
    text-align: center;
    vertical-align: middle;
}

</style>
