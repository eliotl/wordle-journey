<template lang="pug">

Journey

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Journey from './components/Journey.vue';

@Options({
  components: {
    Journey,
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
</style>
