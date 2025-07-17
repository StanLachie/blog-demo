import { user as UserType, post } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

import type { Metadata } from "next";
import NoPosts from "@/components/ui/no-posts";
import PostPreview from "@/components/ui/post-preview";
import db from "@/lib/db/drizzle";

export const metadata: Metadata = {
  title: "Home",
};

async function getPosts() {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      author: {
        id: UserType.id,
        name: UserType.name,
      },
    })
    .from(post)
    .orderBy(desc(post.createdAt))
    .limit(10)
    .innerJoin(UserType, eq(post.authorId, UserType.id));

  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-2xl font-semibold">All Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostPreview key={post.id} post={post} />)
      ) : (
        <NoPosts />
      )}
    </>
  );
}
