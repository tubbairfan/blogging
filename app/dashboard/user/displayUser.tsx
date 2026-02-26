"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "@/layout/BreadCrumbs";
import FilterWrapper from "@/components/Tabs";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import setting2 from "@/public/Settings2.svg";
import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";
import { deleteAdminUser, getAdminUsers } from "@/services/User.services/adminUser";
import UserTable from "./UserTable";
import ViewUserDialog from "./viewsingleUser";
import EditUserDialog from "./editUser";
import type { User } from "./types";

export default function UserClient() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewUserId, setViewUserId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User deleted successfully");
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to delete user";
      toast.error(message);
    },
  });

  const filteredByTab =
    activeTab === "ALL"
      ? users
      : users.filter((user) => (activeTab === "VERIFIED" ? user.isVerified : !user.isVerified));

  const filteredUsers = filteredByTab.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

  const selectedViewUser: User | null = useMemo(
    () => users.find((user) => user.id === viewUserId) ?? null,
    [users, viewUserId]
  );
  const selectedEditUser: User | null = useMemo(
    () => users.find((user) => user.id === editUserId) ?? null,
    [users, editUserId]
  );

  const confirmDelete = (id: number) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this user?</p>
          <div className="flex gap-2 justify-end">
            <button className="px-3 py-1 text-sm border rounded" onClick={closeToast}>
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              onClick={() => {
                deleteMutation.mutate(id);
                closeToast?.();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  return (
    <div className="flex-1 p-5 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
      />

      <div className="p-6">
        <div className="flex items-center justify-between w-full mt-6">
          <FilterWrapper
            tabs={["ALL", "Verified", "Unverified"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <Searchbar
              title="Users"
              description="Manage registered users."
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setPage(1);
              }}
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <Button size="sm" variant="outline" className="flex items-center gap-2 xl:mr-10">
              <img src={setting2.src} alt="Settings" />
              View
            </Button>
          </div>
        </div>

        <UserTable
          data={paginatedData}
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          onView={(id) => setViewUserId(id)}
          onEdit={(id) => setEditUserId(id)}
          onDelete={confirmDelete}
        />

        <Pagination
          totalItems={filteredUsers.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>

      <ViewUserDialog
        open={!!viewUserId}
        onOpenChange={(open) => {
          if (!open) setViewUserId(null);
        }}
        user={selectedViewUser}
      />

      <EditUserDialog
        key={selectedEditUser?.id ?? "edit-user"}
        open={!!editUserId}
        onOpenChange={(open) => {
          if (!open) setEditUserId(null);
        }}
        user={selectedEditUser}
      />
    </div>
  );
}
