import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

import CategoryClient from "./displayCategory";
export default  function CategoryPage() {
  const session =  getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="flex min-h-screen bg-white">
      <CategoryClient/>
      
    </div>
  );
}

