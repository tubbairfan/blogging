"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { updateAdminUser } from "@/services/User.services/adminUser";
import type { User } from "./types";

type EditUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export default function EditUserDialog({ open, onOpenChange, user }: EditUserDialogProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(() => user?.name || "");
  const [email, setEmail] = useState(() => user?.email || "");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const editMutation = useMutation({
    mutationFn: (payload: { id: number; name: string; email: string }) =>
      updateAdminUser(payload.id, { name: payload.name, email: payload.email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onOpenChange(false);
    },
  });

  const handleSave = () => {
    if (!user) return;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    let hasError = false;
    if (!trimmedName) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!trimmedEmail) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;
    editMutation.mutate({ id: user.id, name: trimmedName, email: trimmedEmail });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
          setName(user?.name || "");
          setEmail(user?.email || "");
          setNameError("");
          setEmailError("");
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <label className="font-semibold">Name</label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError("");
            }}
          />
          {nameError ? <p className="text-sm text-red-600">{nameError}</p> : null}

          <label className="font-semibold">Email</label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
          />
          {emailError ? <p className="text-sm text-red-600">{emailError}</p> : null}
        </div>

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
