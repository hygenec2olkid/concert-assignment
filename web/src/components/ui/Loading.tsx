"use client";

import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";
import { useLoading } from "@/src/hooks/useLoading";

export default function Loading() {
  const { isLoading } = useLoading();

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}