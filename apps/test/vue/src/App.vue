<script setup lang="ts">
import Button from './components/Button.vue';
import { BeakerIcon } from '@heroicons/vue/24/solid';
import { LinkIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
const someVariable = ref(5);
</script>

<template>
  <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="flex gap-2 items-start">
  <Button variant="default" size="lg">Button</Button>
  <Button variant="quiet" size="sm">Button</Button>
  <Button variant="secondary" size="md">Button</Button>
  <Button variant="danger" shape="circle"><BeakerIcon /></Button>
  <Button variant="success" ><BeakerIcon /></Button>
  <Button variant="warning" isLoading :isDisabled="someVariable === 5" :prefix="BeakerIcon" :suffix="BeakerIcon">Button</Button>
  <Button variant="outline" >Button</Button>
  <Button variant="warning" size="sm" href="/login" target="_blank" :prefix="LinkIcon">
      Login
    </Button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
