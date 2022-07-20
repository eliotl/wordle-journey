<template lang="pug">
div
  .inputRow(v-for="thing in Array(7)")
    input(@click="$event.target.select()", maxlength=5)
  .spacer
  button(@click="thingA") Embark
  p {{double}}
  .spacer
  .spacer
  .row-holder(v-for="word in guessWords")
    WordRow(:word="word", target="bar")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WordRow from './WordRow.vue';
import { useInputStore } from '@/store/index';
import { useJourneyStore } from '@/store/journey';

@Options({
  components: {
    WordRow,
  },
})
export default class Journey extends Vue {
    get guessWords() {
        return [
            "guess",
            "hwhat",
            "words",
            "nexxt"
        ]
    }

    get inputStore() {
      return useInputStore();
    }

    get journeyStore() {
      return useJourneyStore();
    }

    get double() {
      return this.journeyStore.double;
    }
    
    thingA() {
      // debugger;  // eslint-disable-line no-debugger
      this.journeyStore.increment();
    }

}


</script>

<style scoped>

.row-holder{
}

.spacer{
    height: 1em;
}

input{
  text-transform: uppercase;
  margin: auto;
  text-align: center;
  font-family: monospace;
  width: 6em;
  font-size: 1.2 em;
  background: WhiteSmoke;
  border: 0.5px groove;
}

button {
    font-variant: small-caps;
}

</style>

