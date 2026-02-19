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
import type { Category } from "./types";

type CategoryTableProps = {
  data: Category[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onPublish: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CategoryTable({
  data,
  isLoading,
  isError,
  errorMessage,
  onView,
  onEdit,
  onPublish,
  onDelete,
}: CategoryTableProps) {
  const columns: Column<Category>[] = [
    {
      key: "image",
      label: "",
      render: (row: Category) => (
        <img
          src={row.image || "/Cell.svg"}
          alt={row.title || "Category image"}
          className="h-14 w-14 min-w-14 rounded-sm object-cover"
          onError={(e) => {
            e.currentTarget.src = "/Cell.svg";
          }}
        />
      ),
    },
    {
      key: "title",
      label: "Category Name",
      render: (row: Category) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: "description",
      label: "Description",
      render: (row: Category) => (
        <p className="max-w-50 line-clamp-1 overflow-hidden text-ellipsis text-sm">{row.description}</p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Category) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium inline-block
          ${row.status === "ACTIVE" ? "border border-[#E4E4E7] bg-transparent" : "bg-[#F4F4F5]"}`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "slug", label: "Slug" },
    { key: "articles", label: "Articles" },
    {
      label: "Actions",
      render: (row: Category) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 flex items-center justify-center">
              <img src={ButtonIcon.src} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onView(row.id)}>
              <img src={Eye.src} className="h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(row.id)}>
              <img src={FilePenLine.src} className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onPublish(row.id)}>
              <img src={CircleCheck.src} className="h-4 w-4" /> Publish
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onSelect={() => onDelete(row.id)}>
              <img src={vector.src} className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return <p className="mt-6 text-sm text-[#71717A]">Loading categories...</p>;
  }

  if (isError) {
    return <p className="mt-6 text-sm text-red-600">Failed to load categories: {errorMessage || "Unknown error"}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <ReusableTable data={data} columns={columns} />
    </div>
  );
}
