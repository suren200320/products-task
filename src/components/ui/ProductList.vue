<template>
  <div class="products-list">
    <div class="products-list__container">
      <Product
        v-for="product in items"
        :key="`product-${product.id}`"
        class="products-list__item"
        :label="product.name"
        :value="product.id"
        :is-selected="isSelected(product.id)"
        @update:slected-value="handleSelectItem"
      />
    </div>
    <p v-if="length">Selected {{ items.length }}/ {{ length }}</p>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { ProductItem } from '@/types/product';

  import Product from './Product.vue';

  /**
   * Props interface
   * @property {number[] | number | null} [modelValue] - The current value(s) of selected product(s).
   * @property {ProductItem[]} items - List of product items to display.
   * @property {number} [max] - The maximum number of items that can be selected.
   * @property {number} [length] - The total number of products available for selection.
   */
  interface Props {
    modelValue?: number[] | number | null;
    items: ProductItem[];
    max?: number;
    length?: number;
  }

  /**
   * Emits interface
   * @property {(event: 'update:model-value', value: Props['modelValue']) => void} - Emit an event when the model value is updated.
   */
  const emit = defineEmits<{
    (event: 'update:model-value', value: Props['modelValue']): void;
  }>();

  const props = defineProps<Props>();

  /**
   * Handle item selection
   * @param {number} id - The ID of the product being selected or deselected.
   * Updates the `modelValue` prop by adding or removing the product ID.
   */
  const handleSelectItem = (id: number) => {
    let payload: Props['modelValue'] = props.modelValue;
    if (Array.isArray(payload)) {
      if (payload.includes(id)) {
        payload.splice(payload.indexOf(id), 1);
      } else {
        if (props.max && props.max === payload.length) return;
        payload.push(id);
      }
    } else {
      payload = id;
    }
    emit('update:model-value', payload);
  };

  /**
   * Check if an item is selected
   * @param {number} value - The ID of the product to check.
   * @returns {boolean} - Returns `true` if the item is selected, otherwise `false`.
   */
  const isSelected = (value: number) => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(value);
    } else {
      return props.modelValue === value;
    }
  };
</script>

<style scoped lang="scss">
  .products-list {
    border: 2px solid black;
    padding: 20px;

    &__container {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
</style>
