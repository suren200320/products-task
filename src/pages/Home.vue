<template>
  <div class="main-container">
    <template v-if="!productsStore.loading">
      <div class="main-container__top">
        <!-- List of selected products from user products -->
        <ProductList
          :items="userSelectedProducts"
          :length="6"
        />
        <!-- Selected product -->
        <Product
          v-if="selectedProduct"
          :label="selectedProduct.name"
          :value="selectedProduct.id"
        />
      </div>
      <div class="main-container__bottom">
        <!-- List of user products -->
        <ProductList
          v-model="productsStore.userSelectedProducts"
          :items="productsStore.userProducts"
          :max="6"
        />
        <!-- General list of products -->
        <ProductList
          v-model="productsStore.selectedProductId"
          :items="productsStore.products"
        />
      </div>
    </template>
    <p v-else>Here should be our loader component...</p>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useProductsStore } from '@/stores/useProductsStore';

  import ProductList from '@/components/ui/ProductList.vue';
  import Product from '@/components/ui/Product.vue';

  const productsStore = useProductsStore();

  /**
   * Get the selected product.
   * @returns {Object|null} - The selected product object or the first product in the list.
   */
  const selectedProduct = computed(() =>
    productsStore.selectedProductId
      ? productsStore.getProductById(productsStore.selectedProductId)
      : productsStore.products[0],
  );

  /**
   * Get the list of user-selected products.
   * @returns {Array<Object>} - An array of user-selected product objects.
   */
  const userSelectedProducts = computed(() =>
    productsStore.getUserProductsById(productsStore.userSelectedProducts),
  );

  /**
   * Fetche both general product data and user product data.
   */
  onMounted(async () => {
    await productsStore.fetchProducts();
    await productsStore.fetchUserProducts();
  });
</script>

<style scoped lang="scss">
  .main-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__bottom,
    &__top {
      display: grid;
      gap: 40px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
