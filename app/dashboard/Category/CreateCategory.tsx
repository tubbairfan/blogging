"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CirclePlus from "@/public/CirclePlus.svg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upload from "@/public/Upload.svg";

export default function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <img src={CirclePlus.src} className="h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Create Category
          </DialogTitle>
          <DialogTitle className="text-sm text-[#71717A]">
            Add a new content Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="block font-semibold">
            Image
            <div className="mt-2 border border-dashed rounded-sm h-40 flex items-center justify-center cursor-pointer overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">
                  <img src={upload.src} className="mx-auto mb-2" />
                  Click to Upload Image
                </span>
              )}
            </div>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <label className="font-semibold">Title</label>
          <Input
            placeholder="e.g. Web Development"
            className="mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="font-semibold">Description</label>
          <Textarea
            placeholder="Brief Description of this category.."
            className="mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button >Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
