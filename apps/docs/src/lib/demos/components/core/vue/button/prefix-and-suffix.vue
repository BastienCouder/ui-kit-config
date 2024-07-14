<script setup lang="ts">
import Button from '@/lib/components/core/default/vue/button.vue';
import { UploadIcon } from "@/lib/icons";
</script>

<template>
  <div className="flex items-center gap-2">
    <Button :prefix="UploadIcon">
      Button
    </Button>
    <Button :suffix="UploadIcon">
      Button
    </Button>
  </div>
</template>
