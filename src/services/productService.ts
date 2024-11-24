/**
 * Fetches the list of all products.
 */
export const getProducts = async () => {
  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches the list of user products.
 */
export const getUserProducts = async () => {
  try {
    const response = await fetch('/data/user-products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch user products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw error;
  }
};
