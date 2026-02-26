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
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";
import type {User } from "./types";

type UserTableProps = {
  data: User[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function UserTable({
  data,
  isLoading,
  isError,
  errorMessage,
  onView,
  onEdit,
  onDelete,
}: UserTableProps) {
  const columns: Column<User>[] = [
    { key: "name", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "isVerified",
      label: "Verified",
      render: (row: User) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
            row.isVerified ? "border border-[#E4E4E7] bg-transparent" : "bg-[#F4F4F5]"
          }`}
        >
          {row.isVerified ? "YES" : "NO"}
        </span>
      ),
    },
    {
      label: "Actions",
      render: (row:User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 flex items-center justify-center">
              <img src={ButtonIcon.src} alt="Actions" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onView(row.id)}>
              <img src={Eye.src} className="h-4 w-4" alt="View" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(row.id)}>
              <img src={FilePenLine.src} className="h-4 w-4" alt="Edit" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => onDelete(row.id)}>
              <img src={vector.src} className="h-4 w-4" alt="Delete" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return <p className="mt-6 text-sm text-[#71717A]">Loading users...</p>;
  }

  if (isError) {
    return <p className="mt-6 text-sm text-red-600">Failed to load users: {errorMessage || "Unknown error"}</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <ReusableTable data={data} columns={columns} />
    </div>
  );
}
