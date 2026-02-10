import ReusableTable from "@/components/Table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import ButtonIcon from "@/public/Button.svg";
import Eye from "@/public/eye.svg";
import CircleCheck from "@/public/CircleCheck.svg";
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import CreateCategoryDialog from "./CreateCategory";
import { Button } from "@/components/ui/button";
import setting2 from "@/public/Settings2.svg";
import type { Column } from "@/components/Table";

type Category = {
    image: string;
    title: string;
    description: string;
    status: string;
    slug: string;
    articles: number;
};

const categories: Category[] = [
    { title: "Web Development", description: "All web posts", status: "Active", slug: "web-development", articles: 12, image: "/Cell.svg" },
    { title: "Design", description: "UI related", status: "Draft", slug: "design", articles: 5, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Draft", slug: "marketing", articles: 7, image: "/Cell.svg" },
    { title: "Marketing", description: "Marketing content", status: "Active", slug: "marketing", articles: 7, image: "/Cell.svg" }
];


export default function CategoryPage() {
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredByTab =
        activeTab === "ALL"
            ? categories
            : categories.filter((cat) => cat.status === activeTab);


    const filteredCategories = filteredByTab.filter((cat) =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

   const columns: Column<Category>[]= [
        {
            key: "image",
            label: "",
            render: (row: Category) => (
                <img src={row.image} />
            ),
        },
        {
            key: "title",
            label: "Category Name",
            render: (row: Category) => (
                <span className="font-medium">{row.title}</span>
            ),
        },
        {
            key: "description",
            label: "Description",
            render: (row: Category) => (
                <p className="max-w-50 line-clamp-1 overflow-hidden text-ellipsis text-sm">
                    {row.description}
                </p>
            ),
        },

    {
            key: "status",
            label: "Status",
            render: (row: Category) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block
          ${row.status === "Active"
                            ? "border border-[#E4E4E7] bg-transparent"
                            : "bg-[#F4F4F5]"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        { key: "slug", label: "Slug" },
        { key: "articles", label: "Articles" },
        {
           
            label: "Actions",
            render: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 flex items-center justify-center">
                            <img src={ButtonIcon.src} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={Eye.src} className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={FilePenLine.src} className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={CircleCheck.src} className="h-4 w-4" /> Publish
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={vector.src} className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <div className="p-6">
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
            <ReusableTable data={filteredCategories} columns={columns} />
        </div>
    );
}
