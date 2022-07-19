<template lang="pug">
.row-holder(v-for="word in words")
  WordRow(:word="word", target="bar")
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WordRow from './WordRow.vue';

@Options({
  components: {
    WordRow,
  },
})
export default class Journey extends Vue {
    get words() {
        return [
            "guess",
            "hwhat",
            "words",
            "nexxt"
        ]
    }

}


</script>

<style>

.row-holder{
}


</style>

