"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "@/layout/BreadCrumbs";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import setting2 from "@/public/Settings2.svg";
import CreateCategoryDialog from "./CreateCategory";
import CategoryTable from "./CategoryTable";
import EditCategoryDialog from "./editCategory";
import ViewCategoryDialog from "./viewCategory";
import { deleteCategory, getCategories, updateCategory } from "@/services/Category.services/category";
import { toUiStatus } from "./types";
import type { Category } from "./types";

export default function CategoryClient() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCategoryId, setViewCategoryId] = useState<number | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const publishMutation = useMutation({
    mutationFn: (id: number) => updateCategory(id, { status: "ACTIVE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const tableData: Category[] = categories.map(
    (cat: Omit<Category, "image" | "status"> & { status?: string }) => ({
      ...cat,
      image: "/Cell.svg",
      status: toUiStatus(cat.status),
    })
  );

  const filteredByTab =
    activeTab === "ALL"
      ? tableData
      : tableData.filter((cat) => (cat.status || "").toLowerCase() === activeTab.toLowerCase());

  const filteredCategories = filteredByTab.filter(
    (cat) =>
      (cat.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-5 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Categories" },
        ]}
      />

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
            <Button size="sm" variant="outline" className="flex items-center gap-2 xl:mr-10">
              <img src={setting2.src} alt="Settings" />
              View
            </Button>
          </div>
        </div>

        <CategoryTable
          data={filteredCategories}
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          onView={(id) => setViewCategoryId(id)}
          onEdit={(id) => setEditCategoryId(id)}
          onPublish={(id) => publishMutation.mutate(id)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </div>

      <ViewCategoryDialog
        open={!!viewCategoryId}
        onOpenChange={(open) => {
          if (!open) setViewCategoryId(null);
        }}
        categoryId={viewCategoryId}
      />

      <EditCategoryDialog
        open={!!editCategoryId}
        onOpenChange={(open) => {
          if (!open) setEditCategoryId(null);
        }}
        categoryId={editCategoryId}
      />
    </div>
  );
}
