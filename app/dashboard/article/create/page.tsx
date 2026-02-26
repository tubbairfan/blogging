"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "@/layout/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/texteditor";
import upload from "@/public/Upload.svg";
import Link from "next/link";
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
import type { ArticlePayload } from "@/services/Articles.services/article";

export default function CreateArticlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const articleIdParam = searchParams.get("id");
  const articleId = articleIdParam ? Number(articleIdParam) : null;
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categoryName, setCategoryName] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timeoutId = setTimeout(() => {
      setErrors({});
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errors]);

  const { data: articleData } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId as number),
    enabled: !!articleId,
  });

  const imagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    mutationFn: ({ id, payload }: { id: number; payload: ArticlePayload }) =>
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
    const newErrors: Record<string, string> = {};
    if (!resolvedTitle) newErrors.title = "Title is required";
    if (!resolvedDescription) newErrors.description = "Description is required";
    if (!resolvedCategoryName) newErrors.category = "Category is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload: ArticlePayload = {
      name: resolvedTitle,
      description: resolvedDescription,
      categoryName: resolvedCategoryName,
      status,
      ...(imageFile ? { image: imageFile } : {}),
    };

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
          { label: "Dashboard", href: "/dashboard" },
          { label: "Articles", href: "/dashboard/article" },
          { label: "Create Article" },
        ]}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-3">
        <div className="flex gap-2 items-center">
          <Link href="/dashboard/article">
            <img src={button.src} className="mb-3 md:mb-0" />
          </Link>
          <h2 className="text-xl font-semibold">
            {articleId ? "Edit Article" : "Create Article"}
          </h2>
        </div>

        <div className="hidden md:flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit("DRAFT")}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Save as Draft
          </Button>

          <Button
            onClick={() => handleSubmit("ACTIVE")}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Save Article
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-[#E4E4E7]">
          <h3 className="font-semibold text-2xl mb-3">Article Details</h3>
          <p className="text-sm text-gray-500 mb-2">
            Detailed information about your article
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Title</label>
              <Input
                className="mt-1"
                placeholder="How to Build Modern Web Apps"
                value={title ?? articleData?.name ?? ""}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold">Brief Description</label>
              <Tiptap
                content={description ?? articleData?.description ?? ""}
                onChange={setDescription}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:hidden">
            <Button
              variant="outline"
              onClick={() => handleSubmit("DRAFT")}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit("ACTIVE")}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Save Article
            </Button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="bg-white px-5 py-7 rounded-lg shadow-sm border border-[#E4E4E7]">
            <h3 className="font-semibold text-2xl mb-3">Article Category</h3>
            <p className="font-semibold mb-2">Category</p>

            <Select
              value={categoryName ?? articleData?.category?.title ?? ""}
              onValueChange={setCategoryName}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((c: { id: number; title: string }) => (
                  <SelectItem key={c.id} value={c.title}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E4E4E7]">
            <h3 className="font-semibold text-2xl mb-2">Article Image</h3>
            <p className="text-sm text-gray-500 mb-3">
              Featured image of your article
            </p>

            <input
              id="article-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />

            <label
              htmlFor="article-image"
              className="border-dashed border-2 py-10 rounded-md text-center text-sm cursor-pointer block"
            >
              {imagePreview || articleData?.image ? (
                <img
                  src={imagePreview || articleData?.image}
                  alt="Article preview"
                  className="mx-auto max-h-56 rounded-md"
                />
              ) : (
                <span className="text-sm text-gray-500">
                  <img src={upload.src} className="mx-auto mb-2" />
                  Click to Upload Image
                </span>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
