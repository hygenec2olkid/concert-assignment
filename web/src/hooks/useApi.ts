import { useCallback, useState } from "react";

const useApi = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(async (api: () => Promise<T>) => {
    setLoading(true);
    try {
      const response = await api();
      setData(response);

      return response;
    } catch (error) {
      console.log("API call error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, callApi };
};

export default useApi;
