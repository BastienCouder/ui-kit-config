<script setup lang="ts">
import Button from '@/lib/components/core/default/vue/button.vue';
import { ref } from 'vue';
const someVariable = ref(5);
</script>

<template>
  <Button :isDisabled="someVariable === 5">Button</Button>
</template>
