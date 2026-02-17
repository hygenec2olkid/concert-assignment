"use client";

import "../styles/globals.css";
import Sidebar from "../components/layout/Sidebar";
import Providers from "../store/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
