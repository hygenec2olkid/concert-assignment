"use client";

import {  setRole } from "@/src/store/features/userSlice";
import { useAppDispatch } from "@/src/store/hooks";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");

    if (savedRole) {
      dispatch(setRole(savedRole));
    }

  }, [dispatch]);

  return <>{children}</>;
}
