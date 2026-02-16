"use client";

import { useRef } from "react";
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
import { toApiStatus } from "./types";

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
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId as number),
    enabled: open && !!categoryId,
  });

  const editMutation = useMutation({
    mutationFn: (payload: { title: string; description: string; status: string }) =>
      updateCategory(categoryId as number, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange(false);
    },
  });

  const handleSave = () => {
    const trimmedTitle = titleRef.current?.value.trim() || "";
    const trimmedDescription = descriptionRef.current?.value.trim() || "";
    const statusValue = statusRef.current?.value || "DRAFT";
    if (!trimmedTitle || !trimmedDescription || !categoryId) return;

    editMutation.mutate({
      title: trimmedTitle,
      description: trimmedDescription,
      status: toApiStatus(statusValue),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <label className="font-semibold">Title</label>
            <Input ref={titleRef} defaultValue={data?.title || ""} />
            <label className="font-semibold">Description</label>
            <Textarea ref={descriptionRef} defaultValue={data?.description || ""} />
            <label className="font-semibold">Status</label>
            <select
              ref={statusRef}
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
              defaultValue={toApiStatus(data?.status)}
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
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
