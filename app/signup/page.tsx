"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/User.services/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OtpVerificationModal from "./OtpVerificationModal";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const router = useRouter();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (!error && !fieldErrors.username && !fieldErrors.email && !fieldErrors.password) return;
    const timeoutId = setTimeout(() => {
      setError("");
      setFieldErrors({});
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [error, fieldErrors]);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const nextFieldErrors: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    if (!trimmedUsername) {
      nextFieldErrors.username = "Name is required.";
    } else if (trimmedUsername.length < 5) {
      nextFieldErrors.username = "Name must be at least 5 characters";
    }

    if (!trimmedEmail) {
      nextFieldErrors.email = "Email is required.";
    } else if (!emailPattern.test(trimmedEmail)) {
      nextFieldErrors.email = "Valid email is required";
    }

    if (!password) {
      nextFieldErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextFieldErrors.password = "Password must be at least 6 characters";
    }

    if (nextFieldErrors.username || nextFieldErrors.email || nextFieldErrors.password) {
      setFieldErrors(nextFieldErrors);
      setError("");
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError("");

    try {
      await registerUser({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });
      setPendingEmail(trimmedEmail);
      setOtpModalOpen(true);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Signup failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-87 shadow-md">
          <CardHeader>
            <CardTitle className="font-semibold text-2xl font-sans">Sign up</CardTitle>
            <CardDescription className="font-sans">
              Access your blog management dashboard to create, edit and publish content.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 font-sans">
              <div>
                <CardDescription className="text-sm font-semibold text-black mb-1">
                  User name
                </CardDescription>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (fieldErrors.username) {
                      setFieldErrors((prev) => ({ ...prev, username: undefined }));
                    }
                  }}
                />
                {fieldErrors.username && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>
                )}
              </div>

              <div>
                <CardDescription className="text-sm font-semibold text-black mb-1">
                  Email Address
                </CardDescription>
                <input
                  type="email"
                  className="w-full border p-2 rounded-md"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <CardDescription className="text-sm font-semibold text-black mb-1">
                  Password
                </CardDescription>
                <input
                  type="password"
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                />
                {fieldErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-2 mt-5">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </Button>

              <CardDescription className="flex items-center justify-center text-sm text-[#71717A] mt-3">
                {"Already have an account? "}
                <span
                  className="text-black font-semibold ml-1 cursor-pointer"
                  onClick={() => router.push("/signin")}
                >
                  Sign in
                </span>
              </CardDescription>
            </CardFooter>
          </form>
        </Card>
      </div>

      <OtpVerificationModal
        open={otpModalOpen}
        onOpenChange={setOtpModalOpen}
        email={pendingEmail}
        onVerified={() => router.push("/signin")}
      />
    </>
  );
}
