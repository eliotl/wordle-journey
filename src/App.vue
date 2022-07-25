<template lang="pug">
header#masthead.site-header(role="banner")
  SiteHeader

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

</style>
