import { post as PostType, user as UserType } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

import Post from "@/components/ui/post";
import { cache } from "react";
import db from "@/lib/db/drizzle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string; postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  return {
    title: post ? post.title : "Post not found",
  };
}

export const getPost = cache(async (postId: string) => {
  const posts = await db
    .select({
      title: PostType.title,
      content: PostType.content,
      createdAt: PostType.createdAt,
      author: {
        id: UserType.id,
        name: UserType.name,
      },
    })
    .from(PostType)
    .where(eq(PostType.id, postId))
    .orderBy(desc(PostType.createdAt))
    .innerJoin(UserType, eq(PostType.authorId, UserType.id));
  return posts[0];
});

async function PostPage({
  params,
}: {
  params: Promise<{ userId: string; postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  return (
    <>
      <Post post={post} />
    </>
  );
}

export default PostPage;
