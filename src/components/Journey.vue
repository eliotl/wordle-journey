<template lang="pug">
div
  .inputRow(v-for="(_, index) in Array(7)")
    input(
      @click="$event.target?.select()",
      maxlength=5,
      v-model="inputWords[index]"
    )
  .spacer
  button(@click="runJourney") Embark
  button(@click="toggleWordsVisibility" v-if="displayButton") {{buttonText}}
  .spacer
  .spacer
  .row-holder(v-for="result in results")
    WordRow(:result="result", :showWords="wordsVisible")
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
    wordsVisible: boolean = false;

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

    get displayButton() {
      return this.results.length > 0;
    }

    get buttonText() {
      return this.wordsVisible ? 'Hide words' : 'Show words';
    }

    toggleWordsVisibility() {
      this.wordsVisible = ! this.wordsVisible;
    }
    
    runJourney() {
      this.store.setValidWords(this.store.inputs);
      this.store.resetState();
      this.store.runWords();
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

