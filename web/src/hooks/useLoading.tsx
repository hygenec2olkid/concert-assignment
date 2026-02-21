import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";

export function useLoading() {
  const loading = useAppSelector((state) => state.loading.isLoading);

  const LoadingComponent = () => (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
  return { LoadingComponent };
}
