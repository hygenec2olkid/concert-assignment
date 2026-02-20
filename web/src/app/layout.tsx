"use client";

import "../styles/globals.css";
import Sidebar from "../components/layout/Sidebar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="flex h-screen">
            <aside className="w-[20%] hidden tablet:block">
              <Sidebar />
            </aside>

            <main className="p-8 flex-1 overflow-y-auto">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
