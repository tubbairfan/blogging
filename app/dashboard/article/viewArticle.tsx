"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "@/services/Articles.services/article";
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

type ViewArticleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleId: number | null;
};

export default function ViewArticleDialog({
  open,
  onOpenChange,
  articleId,
}: ViewArticleDialogProps) {
  const stripHtml = (value?: string) =>
    (value || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId as number),
    enabled: open && !!articleId,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">View Article</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-[#71717A]">Loading article...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">Failed to load article.</p>
        ) : data ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Name:</span> {data.name}
            </p>
            <p>
              <span className="font-semibold">Description:</span> {stripHtml(data.description)}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {toUiStatus(data.status)}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {data.category?.title || ""}
            </p>
          </div>
        ) : (
          <p className="text-sm text-[#71717A]">No article data found.</p>
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
