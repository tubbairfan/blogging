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
import ViewCategoryDialog from "./viewsingleCategory";
import { deleteCategory, getCategories, updateCategory } from "@/services/Category.services/category";
import type { Category, CategoryStatus } from "./types";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { getStoredSession } from "@/lib/auth";

type DeleteCategoryErrorResponse = {
  requiresConfirmation?: boolean;
  message?: string;
};

export default function CategoryClient() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCategoryId, setViewCategoryId] = useState<number | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [isAdmin] = useState(() => getStoredSession()?.role === "ADMIN");
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
    mutationFn: ({ id, force }: { id: number; force?: boolean }) => deleteCategory(id, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Category deleted successfully");
    } catch (err: unknown) {
      const responseData = (err as { response?: { data?: DeleteCategoryErrorResponse } })?.response?.data;
      const requiresConfirmation = responseData?.requiresConfirmation;
      const message = responseData?.message;

      if (!requiresConfirmation) {
        toast.error(message);
        return;
      }
      toast.warning(
        <div className="flex flex-col">
          <span>{message}</span>
          <div className="mt-2 flex gap-2 justify-end">
            <button
              className="px-2 py-1 bg-red-600 text-white rounded"
              onClick={() => {
                deleteMutation.mutateAsync({ id, force: true }).then(() => {
                  toast.success("Category and related articles deleted");
                });
                toast.dismiss();
              }}
            >
              Yes
            </button>
            <button
              className="px-2 py-1 bg-gray-400 text-white rounded"
              onClick={() => toast.dismiss()}
            >
              No
            </button>
          </div>
        </div>,
        { autoClose: false }
      );
    }
  };

  const tableData: Category[] = categories.map((cat) => {
    const status: CategoryStatus = cat.status === "ACTIVE" ? "ACTIVE" : "DRAFT";
    return {
      ...cat,
      image: cat.image || "/Cell.svg",
      status,
    };
  });

  const filteredByTab =
    activeTab === "ALL"
      ? tableData
      : tableData.filter((cat) => (cat.status || "").toLowerCase() === activeTab.toLowerCase());

  const filteredCategories = filteredByTab.filter(
    (cat) =>
      (cat.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paginatedData = filteredCategories.slice(
    (page - 1) * pageSize,
    page * pageSize
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
          <CreateCategoryDialog disabled={!isAdmin} />
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
          data={paginatedData}
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          isAdmin={isAdmin}
          onView={(id) => setViewCategoryId(id)}
          onEdit={(id) => setEditCategoryId(id)}
          onPublish={(id) => publishMutation.mutate(id)}
          onDelete={handleDelete}
        />
        <Pagination
          totalItems={filteredCategories.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
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
