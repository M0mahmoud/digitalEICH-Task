import { getCategories } from "@/app/api/categories";
import { useQuery } from "@tanstack/react-query";

export function useAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
