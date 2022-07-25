<template lang="pug">
header#masthead.site-header(role="banner")
  SiteHeader

.content
  h1 Wordle Journey

  Journey

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Journey from './components/Journey.vue';
import SiteHeader from './components/SiteHeader.vue';

@Options({
  components: {
    Journey,
    SiteHeader,
  },
})
export default class App extends Vue {
  
}


</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  color: #4d4c4c;
}

.content{
  max-width: 1000px;
}


@media only screen and (min-width: 1200px) {
  .content {
    zoom: 1.25;
    max-width: 900px;
  }
}

@media only screen and (min-width: 1600px) {
  .content {
    zoom: 1.5;
    max-width: 800px;
  }
}

@media only screen and (min-width: 2000) {
  .content {
    zoom: 1.75;
    max-width: 1100px;
  }
}


@media only screen and (min-width: 2400) {
  .content {
    zoom: 1.75;
    max-width: 1400px;
  }
}




</style>
