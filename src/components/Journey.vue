<template lang="pug">
div
  p.info
    span.infoButton(@click="openInfoModal") ⓘ
  .inputRow(v-for="(_, index) in Array(7)")
    input(
      @click="$event.target?.select()",
      maxlength=5,
      v-model="inputs[index]"
    )
  .spacer
  button(@click="runJourney") Embark
  button(@click="toggleWordsVisibility" v-if="displayButton") {{buttonText}}
  .spacer
  .spacer
  .row-holder(v-for="result in results")
    WordRow(:result="result", :showWords="wordsVisible")
  .spacer
  .spacer
  button(v-if="displayButton" @click="openShareModal") Share
  ShareModal
  InfoModal
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WordRow from './WordRow.vue';
import ShareModal from './ShareModal.vue';
import { ModalName, useJourneyStore } from '@/store/journey';
import InfoModal from './InfoModal.vue';

@Options({
  components: {
    WordRow,
    ShareModal,
    InfoModal,
  },
})
export default class Journey extends Vue {
    wordsVisible: boolean = false;

    get inputs() {
      return this.store.inputs
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

    mounted() {
      window.addEventListener('keydown', this.closeModals)
    }

    openShareModal() {
      this.store.showModal(ModalName.share);
    }

    openInfoModal() {
      this.store.showModal(ModalName.info);
    }

    closeModals(event: KeyboardEvent) {
      if (event.code == 'Escape'){
        this.store.hideModal(ModalName.info);
        this.store.hideModal(ModalName.share);
      }
    }

    toggleWordsVisibility() {
      this.wordsVisible = ! this.wordsVisible;
    }
    
    runJourney() {
      if (this.guesses.length > 0){
        this.store.resetState();
      }
      this.store.setValidWords(this.store.inputs);
      if (this.guesses.length > 0){
        this.store.runWords();
      }
    }
}


</script>

<style scoped>

.spacer{
    height: 1em;
}
 
.info {
  margin-bottom: 1.5em;
}

.infoButton {
  opacity: 0.7;
  color: grey;
  font-size: 1.2rem;
}

.infoButton:hover,
.infoButton:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.inputRow{
  line-height: 1rem;
  margin-bottom: 2px;
}

input{
  text-transform: uppercase;
  margin: auto;
  text-align: center;
  font-family: monospace;
  width: 6em;
  /* font-size: 1.2 em; */
  font-size: 1.5rem;
  line-height: 1.2rem;
  background: WhiteSmoke;
  border: 0.5px groove;
}

button {
    /* font-variant: small-caps; */
    font-size: 1.1rem;
}


@media only screen and (max-width: 700px) {
  button {
    font-size: 0.8rem;
  }
  input {
  width: 5rem;
  font-size: 1.1rem;
  line-height: 1.1rem;
  border: 0.5px groove;
  }

  .infoButton {
    font-size: 0.9rem;
  }
}




</style>

