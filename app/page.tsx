import Link from "next/link";
import {Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Link href="/blog">
      <Button>
        Go to Blog
        </Button>
        </Link>
    </div>
  );
}
