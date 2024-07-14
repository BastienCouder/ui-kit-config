<script setup lang="ts">
import Button from '@/lib/components/core/default/vue/button.vue';
import { ref } from 'vue';
const someVariable = ref(5);
</script>

<template>
  <div className="flex w-full items-center justify-center gap-2">
    <Button size="sm" :isLoading="someVariable === 5">
      Button
    </Button>
    <Button size="md" isLoading>
      Button
    </Button>
    <Button size="lg" isLoading>
      Button
    </Button>
  </div>
</template>
