export type Post = {
  slug: string;
  title: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "nextjs-intro",
    title: "Introduction to Next.js",
    content: "Next.js is a React framework for production."
  },
  {
    slug: "typescript-basics",
    title: "TypeScript Basics",
    content: "TypeScript adds types to JavaScript."
  }
];
