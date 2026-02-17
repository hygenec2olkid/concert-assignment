"use client";

import { Button } from "@mui/material";
import { getDog } from "../lib/api/sample/request";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import { TDogResponse } from "../lib/api/sample/type";

export default function Home() {
  const { data, callApi, loading } = useApi<TDogResponse>();

  useEffect(() => {
    callApi(getDog);
  }, [callApi]);

  return (
    <div>
      {loading ? (
        <div>loadingg..</div>
      ) : (
        <div>
          {data && (
            <div>
              <div className="tablet:text-red-500">
                {data.data[0].attributes.name}
              </div>
              <Button onClick={() => callApi(getDog)}>click me</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
