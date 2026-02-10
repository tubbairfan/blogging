"use client";
import { useState } from "react";
import Breadcrumb from "@/layout/BreadCrumbs";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import CategoryTable from "../../../components/Table";
import CreateCategoryDialog from "./CreateCategory";
import { Button } from "@/components/ui/button";
import setting2 from "@/public/Settings2.svg";

export default function CategoryClient() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    { title: "Web Development", description: "All web posts", status: "Active", slug: "web-development", articles: 12, image: "/Cell.svg" },
    { title: "Design", description: "UI related", status: "Draft", slug: "design", articles: 5, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Draft", slug: "marketing", articles: 7, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Cell.svg" }
  ];


  const filteredByTab =
    activeTab === "ALL"
      ? categories
      : categories.filter((cat) => cat.status === activeTab);

  
  const filteredCategories = filteredByTab.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-5 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/Category" },
          { label: "Categories" },
        ]}
      />

    
       <div className="flex items-center justify-between w-full mt-6">
        <FilterWrapper activeTab={activeTab} onTabChange={setActiveTab} />
        <CreateCategoryDialog />
      </div>

    
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <Searchbar
            title="Categories"
            description="Organize your Content with Categories."
            placeholder="Search ..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="mt-2 sm:mt-0">
          <Button size="sm" variant="outline" className="flex items-center gap-2 xl:mr-10" >
            <img src={setting2.src} alt="Settings" />
            View
          </Button>
        </div>
      </div>

     
      <div className="mt-6">
        <CategoryTable categories={filteredCategories} />
      </div>
    </div>
  );
}
