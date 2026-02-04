import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

import CategoryClient from "./CategoryClient";
export default async function CategoryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="flex min-h-screen bg-white">
      <CategoryClient />
      
    </div>
  );
}

