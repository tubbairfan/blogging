"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import { useRouter } from "next/navigation";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import CategoryTable from "../Category/CategoryTable";
import { Button } from "@/components/ui/button";
import CirclePlus from "@/public/CirclePlus.svg";
import CirclePlus1 from "@/public/CirclePlus1.svg";
import setting2 from "@/public/Settings2.svg";

export default function ArticleClient() {
    const router = useRouter();
    const categories = [
        {
            title: "Web Development",
            description: "All web posts",
            status: "Active",
            slug: "web-development",
            articles: 12,
            image: "/Aspect Ratio.svg"
        },
        {
            title: "Design",
            description: "UI related",
            status: "Draft",
            slug: "design",
            articles: 5,
            image: "/Aspect Ratio.svg"
        },
        {
            title: "Marketing",
            description: "Marketing content",
            status: "Active",
            slug: "marketing",
            articles: 7,
            image: "/Aspect Ratio.svg"
        }, {
            title: "Marketing",
            description: "Marketing content",
            status: "Active",
            slug: "marketing",
            articles: 7,
            image: "/Cell.svg"
        },
        {
            title: "Marketing",
            description: "Marketing content",
            status: "Active",
            slug: "marketing",
            articles: 7,
            image: "/Aspect Ratio.svg"
        }
    ];

    return (

        <div className="flex-1 p-5 min-h-screen">
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard/Category" },
                    { label: "Articles" },
                ]}
            />

            <div className="flex items-center justify-between w-full mt-6">
                <FilterWrapper />
                <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => router.push("/dashboard/article/create")}
                >
                    <img src={CirclePlus.src} className="h-4 w-4" />
                    Create Article
                </Button>

            </div>

            <div className="mt-6 flex items-center justify-between w-full">
           
                <div className="flex items-center gap-4 flex-1">
                    <div >
                        <Searchbar
                            title="Articles"
                            description="Manage your blog Article and content."
                            placeholder="Search ..."
                        />
                    </div>

                    <Button size="sm" variant="outline" className="flex items-center  h-9 mt-18 border border-dashed border-[#E4E4E7]">
                        <img src={CirclePlus1.src} alt="Status" />
                        Status
                    </Button>

                    <Button size="sm" variant="outline"  className="flex items-center gap-2 h-9  mt-18 border border-dashed border-[#E4E4E7]">
                        <img src={CirclePlus1.src} alt="Priority" />
                        Priority
                    </Button>
                </div>

              
                <div>
                    <Button size="sm" variant="outline" className="flex items-center gap-2 h-9 mr-10 mt-18">
                        <img src={setting2.src} alt="View" />
                        View
                    </Button>
                </div>
            </div>

            <CategoryTable
                categories={categories}
                visibleColumns={["image", "title", "description", "status", "actions"]}
            />

        </div>
    );
}
