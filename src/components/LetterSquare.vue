<template lang="pug">
div.green
    span.guess-span {{letter}}
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    letter: String,
    color: String, 
  }
})
export default class LetterSquare extends Vue {
  letter!: string;
  color!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
