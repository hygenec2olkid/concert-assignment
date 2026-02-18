"use client";

import "../styles/globals.css";
import Sidebar from "../components/layout/Sidebar";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="flex h-screen">
            <aside className="w-[20%] bg-white border-r-1 border-gray-300 hidden tablet:block">
              <Sidebar />
            </aside>

            <main className="p-8 flex-1">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
