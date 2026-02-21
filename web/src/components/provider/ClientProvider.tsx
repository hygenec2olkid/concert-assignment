"use client";

import Sidebar from "../layout/Sidebar";
import Loading from "../ui/Loading";
import AuthProvider from "./AuthProvider";
import { ReduxProvider } from "./ReduxProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="p-8 flex-1 overflow-y-auto">{children}</main>
          <Loading />
        </div>
      </AuthProvider>
    </ReduxProvider>
  );
}
