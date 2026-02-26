"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Media from "../public/MediaAsset.svg";
import Home from "../public/Home.svg";
import Mail from "../public/Mail.svg";
import Shopping from "../public/ShoppingBag.svg";
import Settings2 from "../public/Settings2.svg";
import { clearStoredSession, getStoredSession } from "@/lib/auth";
import { logoutUser } from "@/services/User.services/user";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = getStoredSession();

  const links = [
    { href: "/dashboard/", icon: Home, label: "Dashboard" },
    { href: "/dashboard/article", icon: Shopping, label: "Articles" },
    { href: "/dashboard/category", icon: Mail, label: "Categories" },
    { href: "/dashboard/user", icon: Settings2, label: "Users" },
  ];

  return (
    <>
     
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        ☰
      </button>

    
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      <div
        className={`min-h-svh w-64 bg-[#FAFAFA] border-r flex flex-col justify-between p-4
               fixed lg:static inset-0 lg:inset-auto z-50
               transform transition-transform duration-300
               ${open ? "translate-x-0" : "-translate-x-full"}
               lg:translate-x-0`}
      >
        <div>
        
          <div className="mb-10 flex items-center justify-between text-xl font-semibold">
            <div className="flex items-center gap-2">
              <img src={Media.src} className="h-9 w-9 bg-black rounded-md" />
              <span>BlogAdmin</span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-xl font-bold"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded px-3 py-2 font-medium
                    hover:bg-gray-100
                    ${isActive ? "bg-gray-100" : ""}`} 
                >
                  <img src={link.icon.src} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

      
        <div className="flex flex-col gap-3  w-full">
          <div className="flex items-center gap-3">
            <img
              src={Media.src}
              alt="Logo"
              className="h-9 w-9 bg-black rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm" suppressHydrationWarning>
                {session?.username || "User"}
              </span>
              <span className="text-sm" suppressHydrationWarning>
                {session?.email || "No email"}
              </span>
            </div>
          </div>

          <button
            className="text-xs border rounded px-2 py-1"
            onClick={async () => {
              try {
                await logoutUser();
              } catch {
              } finally {
                clearStoredSession();
                router.replace("/signin");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
