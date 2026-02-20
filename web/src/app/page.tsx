"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { setHydrated, setRole } from "../store/features/userSlice";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHydrated(true));
  }, [dispatch]);

  const handleLogin = (role: string) => {
    dispatch(setRole(role));
    localStorage.setItem("role", role);

    if (role === "Admin") {
      router.push("/home");
    }

    if (role === "User") {
      router.push("/user");
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 h-full">
      Login via:
      <button
        className="border-1 p-2 cursor-pointer hover:bg-blue-400 hover:text-white"
        onClick={() => handleLogin("Admin")}
      >
        admin
      </button>
      <button
        className="border-1 p-2 cursor-pointer hover:bg-blue-400 hover:text-white"
        onClick={() => handleLogin("User")}
      >
        user
      </button>
    </div>
  );
}
