import { useCallback, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { offLoad, onLoad } from "../store/features/loadingSlice";

const useApi = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callApi = useCallback(
    async (api: () => Promise<T>) => {
      setLoading(true);
      dispatch(onLoad());
      try {
        const response = await api();
        setData(response);

        return response;
      } catch (error) {
        console.log("API call error:", error);
      } finally {
        setLoading(false);
        dispatch(offLoad());
      }
    },
    [dispatch]
  );

  return { data, loading, callApi };
};

export default useApi;
