<script setup lang="ts">
import Button from '@/lib/components/core/default/vue/button.vue';
import { LinkIcon } from '@/lib/icons';
</script>

<template>
  <Button href="/login" target="_blank" :prefix="LinkIcon">
    Login
  </Button>
</template>