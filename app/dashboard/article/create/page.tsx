"use client";

import Breadcrumb from "@/layout/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upload from "@/public/Upload.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import button from "@/public/Button1.svg";
export default function CreateArticlePage() {
  return (
    <div className="flex-1 p-5 min-h-screen bg-muted/20">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/Category" },
          { label: "Articles", href: "/dashboard/article" },
          { label: "Create Article" },
        ]}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <img src={button.src} className="mb-3" />
          <h2 className="text-xl font-semibold">How to Build Modern Web Apps</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Save Article</Button>
        </div>
      </div>


      <div className="grid grid-cols-12 gap-6 mt-6">

        <div className="col-span-8 bg-white p-6 rounded-lg shadow-sm border border-[#E4E4E7]">
          <h3 className="font-semibold text-2xl mb-3">Article Details</h3>

          <p className="text-sm text-gray-500 mb-2">Detailed information about your article</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold" >Title</label>
              <Input
                className="mt-1"
                placeholder="How to Build Modern Web Apps"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Brief Description</label>
              <Textarea
                className="mt-1 h-60"
                placeholder="Description goes here..."
              />
            </div>
          </div>
        </div>


        <div className="col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E4E4E7]">
            <h3 className="font-semibold text-2xl mb-3">Article Category</h3>
            <p className="font-semibold mb-2">Category </p>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-[#E4E4E7]">
            <h3 className="font-semibold text-2xl mb-2">Article Image</h3>
            <p className="text-sm text-gray-500 mb-3">Featured image of your article</p>

            <label className="border-dashed border-2 p-20 rounded-md text-center text-sm cursor-pointer block">
              <span className="text-sm text-gray-500">
                <img src={upload.src} className="mx-auto mb-2" />
                Click to Upload Image
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
