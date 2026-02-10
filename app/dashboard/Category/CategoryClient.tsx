"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import CategoryTable from "./CategoryTable";
export default function CategoryClient() {

  return (
    <div className="flex-1 p-5 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Categories" },
        ]}
      />
      <div className="mt-6">
      
        <CategoryTable />
      </div>
    </div>
  );
}
