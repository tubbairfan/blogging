"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");

      setTimeout(() => {
        setError("");
      }, 1000);
    } else {
      router.push("/dashboard");
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <CardDescription className="text-sm font-semibold text-black" >
              Password
            </CardDescription>
            <input
              type="password"
              className="w-full border p-2 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CardDescription className="flex items-center justify-between text-sm  text-black mt-3" >
                <label className="flex items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-black cursor-pointer "
                  />
                  Keep me Signed in
                </label>
                <p className="text-[#71717A]  font-sans">
                  Forgot password?
                </p>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <CardDescription className="flex items-center justify-between text-sm  text-black mt-3" >
                <p className="text-[#71717A]  font-sans">
                  Don't have an account? <span className="text-black">Sign up</span>
                </p>
            </CardDescription>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
