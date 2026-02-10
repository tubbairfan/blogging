import Providers from "./provider";
import Sidebar from "@/layout/sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              {children}
             
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
