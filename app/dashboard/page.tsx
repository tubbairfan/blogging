import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>

      <p className="mb-6">Email: {session.user?.email}</p>

      <LogoutButton />
    </div>
  );
}
