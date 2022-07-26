<template lang="pug">
.modal(v-if="modalDisplayed" @click="closeModal")
  .modal-content(@click.stop="")
    span.close(@click="closeModal") &times;
    p 
        | Wordle Journey shows you how close you really were after each round!
        | Input each of your guesses from a game of 
        a(href="https://www.nytimes.com/games/wordle/index.html") Wordle
        | , ending with the correct word.
    p 
        | Click 
        b "Embark" 
        | to see how many words were still possible after each.
    p Then, click 
        b "Show words" 
        | to see which words they were!

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ModalName, useJourneyStore } from '@/store/journey';

@Options({})
export default class ShareModal extends Vue {

  get store() {
    return useJourneyStore();
  }

  get modalDisplayed() {
    return this.store.displayInfoModal;
  }

  closeModal(){
    this.store.hideModal(ModalName.info);
  }

}

</script>

<style scoped>

p {
    font-size: 1.4rem;
}

@media only screen and (max-width: 700px) {
    p {
        font-size: 1.05rem;
    }
}

a {
    text-decoration: none;
    font-weight: bold;
}

</style>