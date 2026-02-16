"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "@/layout/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/texteditor";
import upload from "@/public/Upload.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import button from "@/public/Button1.svg";
import { createArticle, getArticleById, updateArticle } from "@/services/Articles.services/article";
import { getCategories } from "@/services/Category.services/category";
export default function CreateArticlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const articleIdParam = searchParams.get("id");
  const articleId = articleIdParam ? Number(articleIdParam) : null;

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [categoryName, setCategoryName] = useState<string | undefined>(undefined);

  const { data: articleData } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId as number),
    enabled: !!articleId,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push("/dashboard/article");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: {
      id: number;
      payload: { name: string; description: string; categoryName: string; status: string }
    }) =>
      updateArticle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push("/dashboard/article");
    },
  });

  const handleSubmit = (status: "DRAFT" | "ACTIVE") => {
    const resolvedTitle = (title ?? articleData?.name ?? "").trim();
    const resolvedDescription = (description ?? articleData?.description ?? "").trim();
    const resolvedCategoryName = (categoryName ?? articleData?.category?.title ?? "").trim();

    const payload = {
      name: resolvedTitle,
      description: resolvedDescription,
      categoryName: resolvedCategoryName,
      status,
    };

    if (!payload.name || !payload.description || !payload.categoryName) return;

    if (articleId) {
      updateMutation.mutate({ id: articleId, payload });
      return;
    }
    createMutation.mutate(payload);
  };

  return (
    <div className="flex-1 px-2 py-5 min-h-screen md:px-5 ">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/category" },
          { label: "Articles", href: "/dashboard/article" },
          { label: "Create Article" },
        ]}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-3">
        <div className="flex gap-2 items-center">
          <img src={button.src} className="mb-3 md:mb-0" />
          <h2 className="text-xl font-semibold">{articleId ? "Edit Article" : "Create Article"}</h2>
        </div>

        <div className="hidden md:flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={createMutation.isPending || updateMutation.isPending}>
            Save as Draft
          </Button>
          <Button onClick={() => handleSubmit("ACTIVE")} disabled={createMutation.isPending || updateMutation.isPending}>
            Save Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 md:col-span-8 order-last md:order-0 bg-white p-6 rounded-lg shadow-sm border border-[#E4E4E7]">
          <h3 className="font-semibold text-2xl mb-3">Article Details</h3>
          <p className="text-sm text-gray-500 mb-2">Detailed information about your article</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Title</label>
              <Input
                className="mt-1"
                placeholder="How to Build Modern Web Apps"
                value={title ?? articleData?.name ?? ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Brief Description</label>
              <Tiptap content={description ?? articleData?.description ?? ""} onChange={setDescription} />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:hidden">
            <Button variant="outline" onClick={() => handleSubmit("DRAFT")} disabled={createMutation.isPending || updateMutation.isPending}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit("ACTIVE")} disabled={createMutation.isPending || updateMutation.isPending}>
              Save Article
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 order-first md:order-0 flex flex-col md:block gap-4">
          <div className="bg-white px-5 py-7 rounded-lg shadow-sm border border-[#E4E4E7] mb-10">
            <h3 className="font-semibold text-2xl mb-3">Article Category</h3>
            <p className="font-semibold mb-2">Category </p>

            <Select value={categoryName ?? articleData?.category?.title ?? ""} onValueChange={setCategoryName}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category: { id: number; title: string }) => (
                  <SelectItem key={category.id} value={category.title}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E4E4E7]">
            <h3 className="font-semibold text-2xl mb-2">Article Image</h3>
            <p className="text-sm text-gray-500 mb-3">Featured image of your article</p>

            <label className="border-dashed border-2  py-22 rounded-md text-center text-sm cursor-pointer block">
              <span className="text-sm text-gray-500">
                <img src={upload.src} className="mx-auto mb-2" />
                Click to Upload Image
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>


  );
}
