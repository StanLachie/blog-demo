import { post as PostType, user as UserType } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

import NewPost from "@/components/ui/new-post";
import NoPosts from "@/components/ui/no-posts";
import PostPreview from "@/components/ui/post-preview";
import Profile from "@/components/ui/profile";
import { auth } from "@/lib/auth";
import { cache } from "react";
import db from "@/lib/db/drizzle";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUser(userId);
  return {
    title: user ? `${user.name}'s Blog` : "User Not Found",
  };
}

export const getUser = cache(async (userId: string) => {
  const user = await db
    .select({
      name: UserType.name,
      email: UserType.email,
      image: UserType.image,
    })
    .from(UserType)
    .where(eq(UserType.id, userId));
  return user[0];
});

export const getPosts = cache(async (userId: string) => {
  const posts = await db
    .select()
    .from(PostType)
    .where(eq(PostType.authorId, userId))
    .orderBy(desc(PostType.createdAt))
    .innerJoin(UserType, eq(PostType.authorId, UserType.id))
    .then((posts) =>
      posts.map((post) => ({
        ...post.post,
        author: post.user,
      }))
    );
  return posts;
});

export default async function User({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUser(userId);
  const posts = await getPosts(userId);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return (
      <div className="text-center text-2xl font-semibold flex justify-center items-center h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Profile user={user} />
      {session?.user?.id === userId && <NewPost />}
      <div className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostPreview key={post.id} post={post} />)
        ) : (
          <NoPosts />
        )}
      </div>
    </div>
  );
}
