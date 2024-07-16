<script setup lang="ts">
import Button from '@/lib/components/core/default/vue/button.vue';

const variants = [
  "default",
  "primary",
  "outline",
  "quiet",
  "success",
  "warning",
  "danger",
  "accent",
] as const;
</script>


<template>
  <div class="grid grid-cols-4 gap-2">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>
