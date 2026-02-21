"use client";

import { setRole, setUserId } from "@/src/store/features/userSlice";
import { useAppDispatch } from "@/src/store/hooks";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedUserId = localStorage.getItem("userId");

    if (savedRole) {
      dispatch(setRole(savedRole));
    }
    if (savedUserId) {
      dispatch(setUserId(Number(savedUserId)));
    }
    
  }, [dispatch]);

  return <>{children}</>;
}
