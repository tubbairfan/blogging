"use client";

import Link from "next/link";
import Media from '../public/MediaAsset.svg';
import Home from '../public/Home.svg';
import Mail from '../public/Mail.svg';
import Shopping from '../public/ShoppingBag.svg';
import CollapselIcon from "../public/CollapseIcon.svg";
export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#FAFAFA] border-r flex flex-col justify-between p-4">

      <div>
        <div className="mb-10 flex items-center gap-2 text-xl font-semibold">
          <img src={Media.src} className="h-9 w-9 bg-black rounded-md" />
          <span>BlogAdmin</span>
        </div>


        <nav className="space-y-3">
          <Link
            href="#"
            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-100 font-medium"
          >
            <img src={Home.src} />
            <span>Dashboard</span>
          </Link>


          <Link
            href="#"
            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-100 font-medium"
          >
            <img src={Shopping.src} />
            <span>Articles</span>
          </Link>


          <Link
            href="#"
            className="flex items-center gap-2 rounded px-3 py-2 hover:bg-gray-100 font-medium"
          >
            <img src={Mail.src} />
            <span>Categories</span>
          </Link>

        </nav>
      </div>


      <div className="flex items-center justify-between w-full">
       
        <div className="flex items-center gap-3">
          <img
            src={Media.src}
            alt="Logo"
            className="h-9 w-9 bg-black rounded-md"
          />

         
          <div className="flex flex-col ">
            <span className="font-semibold text-sm">schadcn</span>
            <span className="text-sm">m@example.com</span>
          </div>
        </div>

      
        <img
          src={CollapselIcon.src}
          alt="Collapse"
          className="h-5 w-5"
        />
      </div>

    </div>
  );
}
