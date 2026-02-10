"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import CategoryTable from "../../../components/Table";
import { Button } from "@/components/ui/button";
import CirclePlus from "@/public/CirclePlus.svg";
import CirclePlus1 from "@/public/CirclePlus1.svg";
import setting2 from "@/public/Settings2.svg";

export default function ArticleClient() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
     const categories = [
       { title: "Web Development", description: "All web posts", status: "Active", slug: "web-development", articles: 12, image: "/Aspect Ratio.svg" },
       { title: "Design", description: "UI related", status: "Draft", slug: "design", articles: 5, image: "/Cell.svg" },
       { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Aspect Ratio.svg" },
       { title: "Marketing", description: "Marketing content", status: "Draft", slug: "marketing", articles: 7, image: "/Aspect Ratio.svg" },
       { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Aspect Ratio.svg" }
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
                    { label: "Articles" },
                ]}
            />

            <div className="flex items-center justify-between w-full mt-6">
                <FilterWrapper activeTab={activeTab} onTabChange={setActiveTab} />
                <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => router.push("/dashboard/article/create")}
                >
                    <img src={CirclePlus.src} className="h-4 w-4" />
                    Create Article
                </Button>

            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-2">
              
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 flex-1">
                    <div>
                        <Searchbar
                                   title="Categories"
                                   description="Organize your Content with Categories."
                                   placeholder="Search ..."
                                   value={searchQuery}
                                   onChange={setSearchQuery}
                                 />
                    </div>

                    <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center h-9 border border-dashed border-[#E4E4E7] md:mt-19"
                    >
                        <img src={CirclePlus1.src} alt="Status" />
                        Status
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 h-9 border border-dashed border-[#E4E4E7] md:mt-19"
                    >
                        <img src={CirclePlus1.src} alt="Priority" />
                        Priority
                    </Button>
                </div>

               
                <div className="mt-2 sm:mt-0">
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 h-9 md:mt-19"
                    >
                        <img src={setting2.src} alt="View" />
                        View
                    </Button>
                </div>
            </div>


            <CategoryTable
                categories={filteredCategories}
                visibleColumns={["image", "title", "description", "status", "actions"]}
            />

        </div>
    );
}
