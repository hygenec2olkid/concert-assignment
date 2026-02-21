import { useAppSelector } from "../store/hooks";

export function useLoading() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return { isLoading };
}
