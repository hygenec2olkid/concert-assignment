"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "../store/hooks";
import { setRole, setUserId } from "../store/features/userSlice";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import { getListUserApi } from "../lib/api/user/request";
import { UserResponse } from "../lib/api/user/type";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { callApi } = useApi<UserResponse[]>();

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

  useEffect(() => {
    const execute = async () => {
      const data = await callApi(() => getListUserApi());

      if (data && data.length > 0) {
        const firstUser = data[0]; // set login with first user
        dispatch(setUserId(firstUser.id));
        localStorage.setItem("userId", firstUser.id.toString());
      }
    };

    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
