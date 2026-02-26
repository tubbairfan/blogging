"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/User.services/user";
import { setStoredSession } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordOtpModal from "./ForgotPasswordOtpModal";
import ResetPasswordModal from "./ResetPasswordModal";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!error && !fieldErrors.email && !fieldErrors.password) return;
    const timeoutId = setTimeout(() => {
      setError("");
      setFieldErrors({});
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [error, fieldErrors]);

  const handleOpenForgot = () => {
    setForgotEmail(email.trim());
    setForgotOpen(true);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const nextFieldErrors: { email?: string; password?: string } = {};
    if (!trimmedEmail) nextFieldErrors.email = "Email is required.";
    if (!password) nextFieldErrors.password = "Password is required.";

    if (nextFieldErrors.email || nextFieldErrors.password) {
      setFieldErrors(nextFieldErrors);
      setError("");
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError("");

    try {
      const result = await loginUser({ email: trimmedEmail, password });

      setStoredSession(
        {
          role: result.role,
          ...(typeof result.id === "number" ? { id: result.id } : {}),
          email: result.email || trimmedEmail,
          username: result.username,
        },
        keepSignedIn
      );
      router.replace("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center  border-gray-400 ">
      <Card className="w-87">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl font-sans">Sign in</CardTitle>
          <CardDescription className="font-sans" >
            Access your blog managemnet dashboard to create, edit and publish content.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2 font-sans" >
            <CardDescription className="text-sm font-semibold text-black" >
              Email Address
            </CardDescription>
            <input
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
              <p className="text-red-500 text-xs">{fieldErrors.email}</p>
            )}
            <CardDescription className="text-sm font-semibold text-black" >
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
              <p className="text-red-500 text-xs">{fieldErrors.password}</p>
            )}
            <CardDescription className="flex items-center justify-between text-sm  text-black mt-3" >
              <label className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-black cursor-pointer "
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                />
                Keep me Signed in
              </label>
              <button
                type="button"
                className="text-[#71717A] font-sans"
                onClick={handleOpenForgot}
              >
                Forgot password?
              </button>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-5">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <CardDescription className="flex items-center justify-between text-sm  text-black mt-3" >
              <p className="text-[#71717A]  font-sans">
                {"Don't have an account?"}
                <span className="text-black cursor-pointer ml-1" onClick={() => router.push("/signup")}>
                  Sign up
                </span>
              </p>
            </CardDescription>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </CardFooter>
        </form>
      </Card>
      <ForgotPasswordOtpModal
        open={forgotOpen}
        onOpenChange={setForgotOpen}
        initialEmail={email}
        onOtpSent={(normalizedEmail, message) => {
          setForgotEmail(normalizedEmail);
          setForgotOpen(false);
          setResetOpen(true);
          if (message) {
            setError(message);
          }
        }}
      />
      <ResetPasswordModal
        open={resetOpen}
        onOpenChange={setResetOpen}
        email={forgotEmail}
        onSuccess={(normalizedEmail, message) => {
          setEmail(normalizedEmail);
          setPassword("");
          setError(message || "Password reset successful. Please sign in.");
        }}
      />
    </div>
  );
}
