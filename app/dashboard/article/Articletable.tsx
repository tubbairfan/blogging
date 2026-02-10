import ReusableTable from "@/components/Table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import ButtonIcon from "@/public/Button.svg";
import Eye from "@/public/eye.svg";
import CircleCheck from "@/public/CircleCheck.svg";
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CirclePlus from "@/public/CirclePlus.svg";
import CirclePlus1 from "@/public/CirclePlus1.svg";
import setting2 from "@/public/Settings2.svg";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import type { Column } from "@/components/Table";
type Article = {
    image: string;
    title: string;
    description: string;
    status: string;
    category: string;
};

const articles: Article[] = [

    {
        image: "/Aspect Ratio.svg",
        title: "UI Design Principles",
        description: "Learn the core principles of modern UI and UX design.",
        status: "Draft",
        category: "Design",
    },
    {
        image: "/Aspect Ratio.svg",
        title: "SEO for Web Developers",
        description: "Improve your website ranking using SEO best practices.",
        status: "Active",
        category: "Marketing",
    },
    {
        image: "/Aspect Ratio.svg",
        title: "Healthy Morning Routine",
        description: "Simple habits to start your day with energy and focus.",
        status: "Draft",
        category: "Health",
    },
    {
        image: "/Aspect Ratio.svg",
        title: "React Performance Tips",
        description: "Optimize your React applications for better speed.",
        status: "Active",
        category: "Technology",
    },
    {
        image: "/Aspect Ratio.svg",
        title: "Branding for Startups",
        description: "How to create a strong brand identity from scratch.",
        status: "Draft",
        category: "Business",
    },
];


export default function ArticleTable() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredByTab =
        activeTab === "ALL"
            ? articles
            : articles.filter((cat) => cat.status === activeTab);


    const filteredArticles = filteredByTab.filter((cat) =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

   const columns: Column<Article>[]= [
        {
            key: "image",
            label: "",
            render: (row: Article) => (
                <img src={row.image} />
            ),
        },
        {
            key: "title",
            label: "Article Name",
            render: (row: Article) => (
                <p className="max-w-50 line-clamp-1 overflow-hidden text-ellipsis text-sm">
                    {row.title}
                </p>
            ),
        },
        {
            key: "description",
            label: "Description",
            render: (row: Article) => (
                <p className="max-w-50 overflow-hidden text-ellipsis">
                    {row.description}
                </p>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row: Article) => (
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
        {
            key: "category",
            label: "Category",
        },
        {
          
            label: "Actions",
            render: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 flex items-center justify-center">
                            <img src={ButtonIcon.src} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={4}
                        className="w-40"
                    >
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={Eye.src} className="h-4 w-4" />
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={FilePenLine.src} className="h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={CircleCheck.src} className="h-4 w-4" />
                            Publish
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <img src={vector.src} className="h-4 w-4" />
                            Delete
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
                            title="Artcilcles"
                            description="Manage your blog article and content."
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
            <ReusableTable data={filteredArticles} columns={columns} />
        </div>
    );
}
