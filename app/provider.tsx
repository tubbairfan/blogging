"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { AUTH_SESSION_EXPIRED_EVENT } from "@/services/base";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    const handleSessionExpired = () => {
      queryClient.clear();
      router.replace("/signin");
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, [queryClient, router]);

  return (
      <QueryClientProvider client={queryClient}>
        <ToastContainer 
        position="top-right"
         autoClose={1000} 
         pauseOnHover={false}
          theme="dark" />
        {children}
      </QueryClientProvider>
  );
}
