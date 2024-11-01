<template>
  <button class="text-area">
    TextArea: {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type Props = {
  text: string;
}

defineProps<Props>();
</script>
