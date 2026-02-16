"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/layout/BreadCrumbs";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import CirclePlus from "@/public/CirclePlus.svg";
import CirclePlus1 from "@/public/CirclePlus1.svg";
import setting2 from "@/public/Settings2.svg";
import ArticleTable from "./Articletable";
import ViewArticleDialog from "./viewArticle";
import { deleteArticle, getArticles, updateArticle } from "@/services/Articles.services/article";
import type { Article } from "./types";

export default function ArticleClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewArticleId, setViewArticleId] = useState<number | null>(null);

  const { data: articles = [], isLoading, isError, error } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const publishMutation = useMutation({
    mutationFn: (id: number) => updateArticle(id, { status: "ACTIVE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const filteredByTab =
    activeTab === "ALL"
      ? articles
      : articles.filter((article: Article) => article.status === activeTab);

  const filteredArticles = filteredByTab.filter(
    (article: Article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-5 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Articles" },
        ]}
      />

      <div className="p-6">
        <div className="flex items-center justify-between w-full mt-6">
          <FilterWrapper activeTab={activeTab} onTabChange={setActiveTab} />
          <Button size="sm" className="flex items-center gap-2" onClick={() => router.push("/dashboard/article/create")}>
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

            <Button size="sm" variant="outline" className="flex items-center h-9 border border-dashed border-[#E4E4E7] md:mt-19">
              <img src={CirclePlus1.src} alt="Status" />
              Status
            </Button>

            <Button size="sm" variant="outline" className="flex items-center gap-2 h-9 border border-dashed border-[#E4E4E7] md:mt-19">
              <img src={CirclePlus1.src} alt="Priority" />
              Priority
            </Button>
          </div>

          <div className="mt-2 sm:mt-0">
            <Button size="sm" variant="outline" className="flex items-center gap-2 h-9 md:mt-19">
              <img src={setting2.src} alt="View" />
              View
            </Button>
          </div>
        </div>

        <ArticleTable
          data={filteredArticles}
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          onView={(id) => setViewArticleId(id)}
          onEdit={(id) => router.push(`/dashboard/article/create?id=${id}`)}
          onPublish={(id) => publishMutation.mutate(id)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </div>

      <ViewArticleDialog
        open={!!viewArticleId}
        onOpenChange={(open) => {
          if (!open) setViewArticleId(null);
        }}
        articleId={viewArticleId}
      />
    </div>
  );
}
