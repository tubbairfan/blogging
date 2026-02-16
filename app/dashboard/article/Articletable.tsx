"use client";

import ReusableTable from "@/components/Table";
import type { Column } from "@/components/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonIcon from "@/public/Button.svg";
import Eye from "@/public/eye.svg";
import CircleCheck from "@/public/CircleCheck.svg";
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";
import type { Article } from "./types";

type ArticleTableProps = {
  data: Article[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onPublish: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ArticleTable({
  data,
  isLoading,
  isError,
  errorMessage,
  onView,
  onEdit,
  onPublish,
  onDelete,
}: ArticleTableProps) {
  const columns: Column<Article>[] = [
    {
      key: "image",
      label: "",
      render: (row: Article) => <img src={row.image} />,
    },
    {
      key: "title",
      label: "Article Name",
      render: (row: Article) => <p className="max-w-50 line-clamp-1 overflow-hidden text-ellipsis text-sm">{row.title}</p>,
    },
    {
      key: "description",
      label: "Description",
      render: (row: Article) => <p className="max-w-50 overflow-hidden text-ellipsis">{row.description}</p>,
    },
    {
      key: "status",
      label: "Status",
      render: (row: Article) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium inline-block
          ${row.status === "Active" ? "border border-[#E4E4E7] bg-transparent" : "bg-[#F4F4F5]"}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "category", label: "Category" },
    {
      label: "Actions",
      render: (row: Article) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 flex items-center justify-center">
              <img src={ButtonIcon.src} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onView(row.id)}>
              <img src={Eye.src} className="h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(row.id)}>
              <img src={FilePenLine.src} className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onPublish(row.id)}>
              <img src={CircleCheck.src} className="h-4 w-4" />
              Publish
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onDelete(row.id)}>
              <img src={vector.src} className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return <p className="mt-6 text-sm text-[#71717A]">Loading articles...</p>;
  }

  if (isError) {
    return <p className="mt-6 text-sm text-red-600">Failed to load articles: {errorMessage || "Unknown error"}</p>;
  }

  return <ReusableTable data={data} columns={columns} />;
}
