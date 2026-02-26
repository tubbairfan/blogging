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
import { forgotPassword } from "@/services/User.services/user";

type ForgotPasswordOtpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEmail?: string;
  onOtpSent: (email: string, message?: string) => void;
};

export default function ForgotPasswordOtpModal({
  open,
  onOpenChange,
  initialEmail = "",
  onOtpSent,
}: ForgotPasswordOtpModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClose = () => {
    setError("");
    setLoading(false);
    onOpenChange(false);
  };

  const handleSendOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }
    if (!emailPattern.test(normalizedEmail)) {
      setError("Valid email is required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await forgotPassword({ email: normalizedEmail });
      onOtpSent(normalizedEmail, result?.message);
      handleClose();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Failed to send OTP.";
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
        setEmail(initialEmail);
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>Enter your email to receive OTP.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <input
            type="email"
            className="w-full border p-2 rounded-md"
            placeholder="admin@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
