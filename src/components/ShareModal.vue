<template lang="pug">
.modal(v-if="modalDisplayed" @click="closeModal")
  .modal-content(@click.stop="")
    span.close(@click="closeModal()") &times;
    p Share your results with these emojis:
    .modalList
      .modalRow(v-for="emojiRow in emojis") {{emojiRow}}
    button(@click="copyEmojis()") Copy
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ModalName, useJourneyStore } from '@/store/journey';
import { map } from 'lodash/fp';

@Options({})
export default class ShareModal extends Vue {

  get store() {
    return useJourneyStore();
  }

  get modalDisplayed() {
    return this.store.displayShareModal;
  }

  get emojis() {
    return map('emojis')(this.store.results)
  }

  get emojiText() {
    return this.emojis.join('\n');
  }

  closeModal(){
    this.store.hideModal(ModalName.share);
  }

  copyEmojis(){
    navigator.clipboard.writeText(this.emojiText)
    this.closeModal();
  }


}

</script>

<style >

/**
 * This modal code is from stack overflow
 * https://stackoverflow.com/questions/51906819/how-to-set-vertical-scroll-to-modal-popup-on-body
 */
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
}

@media only screen and (max-width: 700px) {
  .modal-content {
    width: 80%;
  }
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modalRow{
  display: table-row;
}

.modalList {
  text-align: left;
  line-height: 1em;
  margin: auto;
  display: table;
  padding-bottom: 1em;
}

</style>
