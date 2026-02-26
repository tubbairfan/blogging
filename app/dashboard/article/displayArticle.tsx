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
import ViewArticleDialog from "./viewsingleArticle";
import { deleteArticle, getArticles, updateArticle } from "@/services/Articles.services/article";
import type { Article, ArticleStatus } from "./types";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { getStoredSession } from "@/lib/auth";
export default function ArticleClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewArticleId, setViewArticleId] = useState<number | null>(null);
  const [isAdmin] = useState(() => getStoredSession()?.role === "ADMIN");

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
  const tableData: Article[] = articles.map((article) => {
    const status: ArticleStatus = article.status === "ACTIVE" ? "ACTIVE" : "DRAFT";
    return {
      ...article,
      status,
    };
  });
  const filteredByTab =
    activeTab === "ALL"
      ? tableData
      : tableData.filter((article: Article) => article.status.toLowerCase() === activeTab.toLowerCase());

  const filteredArticles = filteredByTab.filter(
    (article: Article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const paginatedData = filteredArticles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const confirmDelete = (id: number) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this article?</p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 text-sm border rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              onClick={() => {
                deleteMutation.mutate(id);
                closeToast?.();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };
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
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => router.push("/dashboard/article/create")}
            disabled={!isAdmin}
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
          data={paginatedData}
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          isAdmin={isAdmin}
          onView={(id) => setViewArticleId(id)}
          onEdit={(id) => router.push(`/dashboard/article/create?id=${id}`)}
          onPublish={(id) => publishMutation.mutate(id)}
          onDelete={(id) => confirmDelete(id)}
        />
        <Pagination
          totalItems={filteredArticles.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
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
