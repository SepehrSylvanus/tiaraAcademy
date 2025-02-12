import { getCategories } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["getCategory"],
    queryFn: async () => {
      const categories = getCategories();
      return categories;
    },
  });
};
