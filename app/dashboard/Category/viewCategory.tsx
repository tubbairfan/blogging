"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/services/Category.services/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toUiStatus } from "./types";

type ViewCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: number | null;
};

export default function ViewCategoryDialog({
  open,
  onOpenChange,
  categoryId,
}: ViewCategoryDialogProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId as number),
    enabled: open && !!categoryId,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">View Category</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-[#71717A]">Loading category...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">Failed to load category.</p>
        ) : data ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Title:</span> {data.title}
            </p>
            <p>
              <span className="font-semibold">Description:</span> {data.description}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {toUiStatus(data.status)}
            </p>
            <p>
              <span className="font-semibold">Slug:</span> {data.slug}
            </p>
            <p>
              <span className="font-semibold">Articles:</span> {data._count?.articles || 0}
            </p>
          </div>
        ) : (
          <p className="text-sm text-[#71717A]">No category data found.</p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-sm">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
