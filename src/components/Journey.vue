<template lang="pug">
div
  .inputRow(v-for="(item, index) in Array(7)")
    input(
      @click="$event.target?.select()",
      maxlength=5,
      v-model="inputWords[index]"
    )
  .spacer
  button(@click="runJourney") Embark
  .spacer
  .spacer
  .row-holder(v-for="result in results")
    WordRow(:result="result")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WordRow from './WordRow.vue';
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

    get inputWords() {
      return this.store.inputWords
    }

    get guesses() {
      return this.store.guesses
    }

    get results() {
      return this.store.results
    }

    get store() {
      return useJourneyStore();
    }
    
    runJourney() {
      this.store.setValidWords(this.store.inputs);
      this.store.runWords();
      console.log(this.store.resultRows)
    }

}


</script>

<style scoped>

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

