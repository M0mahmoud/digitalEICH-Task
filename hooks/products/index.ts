import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "@/app/api/products";
import { INewProduct, IProduct } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllProducts({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query: string | null;
}) {
  return useQuery({
    queryKey: ["products", { page, limit, query }],
    queryFn: () => getProducts({ page, limit, query }),
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

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: IProduct }) =>
      updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    mutationKey: ["deleteProduct"],
  });
}
