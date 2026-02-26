"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryById, updateCategory } from "@/services/Category.services/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upload from "@/public/Upload.svg";
import type { CategoryStatus } from "./types";

type EditCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: number | null;
};

export default function EditCategoryDialog({
  open,
  onOpenChange,
  categoryId,
}: EditCategoryDialogProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [status, setStatus] = useState<CategoryStatus | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const selectedImagePreview = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId as number),
    enabled: open && !!categoryId,
  });
  const resolvedTitle = title ?? data?.title ?? "";
  const resolvedDescription = description ?? data?.description ?? "";
  const resolvedStatus: CategoryStatus =
    status ?? (data?.status === "ACTIVE" ? "ACTIVE" : "DRAFT");
  const imagePreview = selectedImagePreview || data?.image || null;

  const editMutation = useMutation({
    mutationFn: (payload: { title: string; description: string; status: CategoryStatus; image?: File }) =>
      updateCategory(categoryId as number, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", categoryId] });
      setTitleError("");
      setDescriptionError("");
      setErrorMessage("");
      onOpenChange(false);
    },
  });

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  const handleSave = () => {
    const trimmedTitle = resolvedTitle.trim();
    const trimmedDescription = resolvedDescription.trim();
    let hasError = false;

    if (!trimmedTitle) {
      setTitleError("Title is required");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!trimmedDescription) {
      setDescriptionError("Description is required");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (hasError || !categoryId) return;
    setErrorMessage("");

    editMutation.mutate({
      title: trimmedTitle,
      description: trimmedDescription,
      status: resolvedStatus,
      ...(imageFile ? { image: imageFile } : {}),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
          setTitle(null);
          setDescription(null);
          setStatus(null);
          setImageFile(null);
          setTitleError("");
          setDescriptionError("");
          setErrorMessage("");
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">Edit Category</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-[#71717A]">Loading category...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">Failed to load category.</p>
        ) : (
          <div className="space-y-3" key={categoryId ?? "new"}>
            <label className="block font-semibold" htmlFor="edit-category-image">
              Image
              <div className="mt-2 border border-dashed rounded-sm h-40 flex items-center justify-center cursor-pointer overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Category preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm text-gray-500">
                    <img src={upload.src} className="mx-auto mb-2" />
                    Click to Upload Image
                  </span>
                )}
              </div>
              <input
                id="edit-category-image"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <label className="font-semibold">Title</label>
            <Input
              value={resolvedTitle}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
            />
            {titleError && (
              <p className="text-sm text-red-600">{titleError}</p>
            )}
            <label className="font-semibold">Description</label>
            <Textarea
              value={resolvedDescription}
              onChange={(e) => {
                setDescription(e.target.value);
                if (descriptionError) setDescriptionError("");
              }}
            />
            {descriptionError && (
              <p className="text-sm text-red-600">{descriptionError}</p>
            )}
            <label className="font-semibold">Status</label>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
              value={resolvedStatus}
              onChange={(e) => setStatus(e.target.value === "ACTIVE" ? "ACTIVE" : "DRAFT")}
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
        )}
        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-sm">
              Cancel
            </Button>
          </DialogClose>
          <Button className="rounded-sm" onClick={handleSave} disabled={editMutation.isPending}>
            {editMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}