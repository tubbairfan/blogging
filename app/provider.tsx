"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer 
        position="top-right"
         autoClose={1000} 
         pauseOnHover={false}
          theme="dark" />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
