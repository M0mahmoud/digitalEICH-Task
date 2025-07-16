import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "@/app/api/products";
import { INewProduct, IProduct } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllProducts({ page, limit }: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["products", { page, limit }],
    queryFn: () => getProducts({ page, limit }),
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: INewProduct) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    mutationKey: ["createProduct"],
  });
}

export function useUpdateProduct(id: number, product: IProduct) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product", id, product],
    mutationFn: () => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", product.id] });
    },
  });
}

export function useDeleteProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product", id],
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
