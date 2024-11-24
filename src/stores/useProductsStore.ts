import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getProducts, getUserProducts } from '@/services/productService';

import { ProductItem } from '@/types/product';

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([]);
  const userProducts = ref<ProductItem[]>([]);
  const selectedProductId = ref<number>();
  const userSelectedProducts = ref<number[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * Fetches the list of all products.
   */
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getProducts();
      products.value = data;
    } catch (err) {
      error.value = 'Failed to load products.';
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches the list of user products.
   */
  const fetchUserProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getUserProducts();
      userProducts.value = data;
    } catch (err) {
      error.value = 'Failed to load user products.';
    } finally {
      loading.value = false;
    }
  };

  /**
   * Gets a product by ID.
   */
  const getProductById = (id: number) => {
    return products.value.find((item) => item.id === id);
  };

  /**
   * Gets user products by IDs.
   */
  const getUserProductsById = (ids: number[]) => {
    return userProducts.value.filter((item) => ids.includes(item.id));
  };

  return {
    products,
    userProducts,
    selectedProductId,
    userSelectedProducts,
    loading,
    error,

    fetchProducts,
    fetchUserProducts,
    getProductById,
    getUserProductsById,
  };
});
