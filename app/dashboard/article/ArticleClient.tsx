"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import ArticleTable from "./Articletable";
export default function ArticleClient() {

    return (
        <div className="flex-1 p-5 min-h-screen">
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard/category" },
                    { label: "Articles" },
                ]}
            />
            <ArticleTable />
        </div>
    );
}
