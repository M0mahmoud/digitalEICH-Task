import { apiClient } from "@/lib/apiClient";

export const getCategories = async () => {
  try {
    const response = await apiClient("GET", "/categories");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
