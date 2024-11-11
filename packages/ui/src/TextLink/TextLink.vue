<template>
  <button class="text-link">Text: {{ name }}</button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type Props = {
  name: string;
};

defineProps<Props>();
</script>
