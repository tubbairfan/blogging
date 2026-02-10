"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/public/Button.svg";
import Eye from "@/public/eye.svg";
import CircleCheck from "@/public/CircleCheck.svg";
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";

type Category = {
  title: string;
  description: string;
  status: string;
  slug: string;
  articles: number;
  image?: string;
};

type ColumnKey = "image" | "title" | "description" | "status" | "slug" | "articles" | "actions";

interface CategoryTableProps {
  categories: Category[];
  visibleColumns?: ColumnKey[];
}

export default function CategoryTable({ categories, visibleColumns }: CategoryTableProps) {
  const isVisible = (key: ColumnKey) =>
    !visibleColumns || visibleColumns.includes(key);

  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            {isVisible("image") && <TableHead></TableHead>}
            {isVisible("title") && <TableHead>Category Name</TableHead>}
            {isVisible("description") && <TableHead>Description</TableHead>}
            {isVisible("status") && <TableHead>Status</TableHead>}
            {isVisible("slug") && <TableHead>Slug</TableHead>}
            {isVisible("articles") && <TableHead>Articles</TableHead>}
            {isVisible("actions") && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat, index) => (
            <TableRow key={index}>
              {isVisible("image") && (
                <TableCell>
                  <img src={cat.image} />
                </TableCell>
              )}
              {isVisible("title") && (
                <TableCell>
                  <span className="font-medium">{cat.title}</span>
                </TableCell>
              )}
              {isVisible("description") && (
                <TableCell className="text-sm">{cat.description}</TableCell>
              )}
              {isVisible("status") && (
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block
                      ${cat.status === "Active" ? "border border-[#E4E4E7] bg-transparent" : "bg-[#F4F4F5]"}`}
                  >
                    {cat.status || "Draft"}
                  </span>
                </TableCell>
              )}
              {isVisible("slug") && <TableCell className="text-sm">{cat.slug}</TableCell>}
              {isVisible("articles") && <TableCell className="text-sm">{cat.articles}</TableCell>}
              {isVisible("actions") && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 flex items-center justify-center">
                        <img src={Button.src} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <img src={Eye.src} className="h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <img src={FilePenLine.src} className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <img src={CircleCheck.src} className="h-4 w-4" />
                        Publish
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <img src={vector.src} className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
