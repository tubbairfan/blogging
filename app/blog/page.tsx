import { posts } from "@/data/post";

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>

      {posts.map(post => (
        <div key={post.slug}>
            {post.title}
            
         
        </div>
      ))}
    </div>
  );
}
