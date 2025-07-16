import { apiClient } from "@/lib/apiClient";
import { INewProduct, IProduct } from "@/types/products";

export const getProducts = async (params: Record<string, any> = {}) => {
  try {
    const response = await apiClient("GET", "/products", { params });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await apiClient("GET", `/products/slug/${slug}`);
    return response;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: INewProduct) => {
  try {
    const response = await apiClient("POST", "/products", {
      data: productData,
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: number, productData: IProduct) => {
  try {
    const response = await apiClient("PUT", `/products/${id}`, {
      data: productData,
    });
    return response;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await apiClient("DELETE", `/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
