import "../styles/globals.css";
import Sidebar from "../components/layout/Sidebar";
import { ReduxProvider } from "../components/provider/ReduxProvider";
import AuthProvider from "../components/provider/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <div className="flex h-screen">
              <Sidebar />

              <main className="p-8 flex-1 overflow-y-auto">{children}</main>
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
