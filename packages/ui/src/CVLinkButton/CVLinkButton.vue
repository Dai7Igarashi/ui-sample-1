<template>
  <a :class="cvLinkButtonClasses" :href="href" :target="target">
    <slot name="text"></slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue';

type Layout = 'intrinsic' | 'fullWidth';
type Size = 'large' | 'medium' | 'small';
type Variant = 'contained' | 'outlined' | 'lighted' | 'neutral' | 'danger';

type Props = {
  href: string;
  target?: '_blank';
  layout?: Layout;
  size?: Size;
  variant?: Variant;
}

const props = withDefaults(defineProps<Props>(), {
  target: undefined,
  layout: 'intrinsic',
  size: 'large',
  variant: 'contained',
});

const BLOCK_NAME = 'ui-CVLinkButton';
const cvLinkButtonClasses = computed(() => [
  BLOCK_NAME,
  `${BLOCK_NAME}--${props.layout}`,
  `${BLOCK_NAME}--${props.size}`,
  `${BLOCK_NAME}--${props.variant}`
]);
</script>
