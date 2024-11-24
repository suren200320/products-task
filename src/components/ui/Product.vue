<template>
  <div
    class="product"
    :class="{ 'product--selected': isSelected }"
    @click="handleSelect"
  >
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  /**
   * Props interface
   * @property {string} label - The name or label of the product.
   * @property {number} value - The unique ID of the product.
   * @property {boolean} [isSelected] - Indicates if the product is currently selected.
   */
  interface Props {
    label: string;
    value: number;
    isSelected?: boolean;
  }

  /**
   * Emits interface
   * @property {(event: 'update:slected-value', value: number) => void} - Emit an event when the product is selected.
   */
  const emit = defineEmits<{
    (event: 'update:slected-value', value: number): void;
  }>();

  const props = defineProps<Props>();

  /**
   * Handles the selection of a product
   * Emits the product's `value` if the `isSelected` prop is a boolean.
   */
  const handleSelect = () => {
    if (typeof props.isSelected !== 'boolean') return;
    emit('update:slected-value', props.value);
  };
</script>

<style scoped lang="scss">
  .product {
    height: 100px;
    width: 150px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    border: 2px solid black;
    transition: all 500ms;

    &--selected {
      color: white;
      background-color: black;
    }
  }
</style>
