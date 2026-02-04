"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import FilterWrapper from "@/components/FilterWrapper";
import Card from "@/components/Card";
import CategoryTable from "./CategoryTable";
import CreateCategoryDialog from "./CreateCategory";

import View from "@/components/View";

export default function CategoryClient() {

    const categories = [
        {
            title: "Web Development",
            description: "All web posts",
            status: "Active",
            slug: "web-development",
            articles: 12,
            image: "/Cell.svg"
        },
        {
            title: "Design",
            description: "UI related",
            status: "Draft",
            slug: "design",
            articles: 5,
            image: "/Cell.svg"
        },
        {
            title: "Marketing",
            description: "Marketing content",
            status: "Active",
            slug: "marketing",
            articles: 7,
            image: "/Cell.svg"
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
            image: "/Cell.svg"
        }
    ];

    return (
        
        <div className="flex-1 p-5 min-h-screen">
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard/Category" },
                    { label: "Categories" },
                ]}
            />

            <div className="flex items-center justify-between w-full mt-6">
                <FilterWrapper />
                <CreateCategoryDialog />
            </div>

            <div className="mt-6 flex items-start ">
              
                <div className="flex-1">
                    <Card
                        title="Categories"
                        description="Organize your Content with Categories."
                        placeholder="Search ..."
                    />
                </div>
                <div className="mr-15 mt-20">
                    <View />
                </div>
            </div>
            <CategoryTable categories={categories} />
        </div>
    );
}
