import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";

export function useLoading() {
  const [loading, setLoading] = React.useState(false);

  const onLoading = () => setLoading(true);
  const offLoading = () => setLoading(false);

  const LoadingComponent = () => (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
  return { LoadingComponent, onLoading, offLoading };
}
