"use client";
import { useLoading } from "@/src/hooks/useLoading";
import { ReactNode } from "react";

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const { LoadingComponent } = useLoading();

  return (
    <>
      <LoadingComponent />
      {children}
    </>
  );
}
