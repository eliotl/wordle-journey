<template lang="pug">
header#masthead.site-header(role="banner")
  SiteHeader

.content
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
  margin-bottom: 60px;
}

h1 {
  color: #4d4c4c;
  font-size: 3.5rem;
}

.content{
  font-size: 2rem;
  margin-top: 5vw;
}

@media only screen and (max-width: 700px) {
  #app {
    margin-top: 20px;
  }
  .content {
    font-size: 1.1rem;
    margin-top: 15vw;
  }
  h1 {
    font-size: 1.5rem;
  }
}



</style>
