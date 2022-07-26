<template lang="pug">
.header
    .site-branding
        p.site-title
            a(href="https://rhymeghoul.com" rel="Rhyme Ghoul") Rhyme Ghoul
        p.site-description a rhyme tool
    .app-title
        h1 Wordle Journey
    .info
        p
          span.infoButton(@click="openInfoModal") ⓘ
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';
import { ModalName, useJourneyStore } from '@/store/journey';

export default class SiteHeader extends Vue {
 
     openInfoModal() {
      this.store.showModal(ModalName.info);
    }
    get store() {
      return useJourneyStore();
    }



}


</script>


<style scoped>

.infoButton {
  color: grey;
  font-size: 1.5rem;
}

.infoButton:hover,
.infoButton:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


.header {
    display: flex;
    justify-content: space-around;
}

h1 {
    font-size: 3rem;
    margin-top: 1vw;
    /* text-transform:uppercase; */
    font-variant: small-caps;

}

@media only screen and (max-width: 700px) {
    h1 {
        font-size: 1.6rem;
    }
    a {
        font-size: 1.1rem;
    }
    p {
        font-size: 0.7rem;
    }
    .infoButton{
        font-size: 1.2rem;
    }
}

.site-branding {
    width: 15%;
    display: grid;
}

.app-title {
    width: 35%
}
.info {
    width: 15%
}

.site-title {
    clear: none;
    font-weight: bold;
    line-height: 1.2;
    margin: 0 0.4375em 0 0;
    color: #404040;
    font-size: 29px;
    float: left;
}
a {
    text-decoration: none;
}

    
p {
    text-align: left;
    padding-left: 15%;
    font-family: "Libre Baskerville", Libre, Georgia, Times, serif;
}

.site-description {
    font-style: italic;
    vertical-align: bottom;
    color: #00223f;
    margin-top: 0.2em;
}

@media only screen and (max-width: 700px) {
    .site-title{
        font-size: 1.3rem;
    }
    .site-branding {
        padding-bottom: 0;
    }
}

</style>