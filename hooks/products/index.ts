import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "@/app/api/products";
import { INewProduct, IProduct } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllProducts({ params }: { params: Record<string, any> }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
  });
}

export function useCreateProduct(product: INewProduct) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-product", product],
    mutationFn: () => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
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
