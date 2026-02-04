"use client";

import Link from "next/link";
import ChevronRight from '../public/ChevronRight.svg';
interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm font-medium text-gray-600 flex items-center space-x-2">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:underline text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}

         
          {index < items.length - 1 && (
            <img src={ChevronRight.src} className="ml-2"/>
          )}
        </span>
      ))}
    </nav>
  );
}
