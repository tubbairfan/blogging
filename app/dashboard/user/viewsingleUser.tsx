"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "./types";

type ViewUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export default function ViewUserDialog({ open, onOpenChange, user }: ViewUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">View User</DialogTitle>
        </DialogHeader>

        {user ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Name:</span> {user.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-semibold">Verified:</span> {user.isVerified ? "Yes" : "No"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-[#71717A]">No user data found.</p>
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
