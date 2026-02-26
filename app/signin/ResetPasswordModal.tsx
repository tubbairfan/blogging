"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { resetPassword } from "@/services/User.services/user";

type ResetPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onSuccess: (email: string, message?: string) => void;
};

export default function ResetPasswordModal({
  open,
  onOpenChange,
  email,
  onSuccess,
}: ResetPasswordModalProps) {
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOtpCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setLoading(false);
    onOpenChange(false);
  };

  const handleReset = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedOtp = otpCode.trim();
    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }
    if (!trimmedOtp) {
      setError("OTP is required.");
      return;
    }
    if (!newPassword) {
      setError("New password is required.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Confirm password does not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await resetPassword({
        email: normalizedEmail,
        code: trimmedOtp,
        newPassword,
      });
      onSuccess(normalizedEmail, result?.message);
      handleClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Failed to reset password.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter OTP sent to <span className="font-semibold">{email}</span> and set your new password.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="w-full border p-2 rounded-md"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="w-full border p-2 rounded-md"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleReset} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
