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
import { verifyOtp } from "@/services/User.services/user";

type OtpVerificationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerified: () => void;
};

export default function OtpVerificationModal({
  open,
  onOpenChange,
  email,
  onVerified,
}: OtpVerificationModalProps) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const handleClose = () => {
    setOtp("");
    setOtpError("");
    setOtpLoading(false);
    onOpenChange(false);
  };

  const handleVerifyOtp = async () => {
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      setOtpError("OTP is required.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      await verifyOtp({
        email,
        code: trimmedOtp,
      });
      handleClose();
      onVerified();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Invalid OTP.";
      setOtpError(message);
      setOtpLoading(false);
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
          <DialogTitle>Verify OTP</DialogTitle>
          <DialogDescription>
            Enter the OTP sent to <span className="font-semibold">{email}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {otpError ? <p className="text-sm text-red-500">{otpError}</p> : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={otpLoading}>
            Cancel
          </Button>
          <Button onClick={handleVerifyOtp} disabled={otpLoading}>
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
