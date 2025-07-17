"use server";

import { and, eq } from "drizzle-orm";

import { post as PostType } from "../db/schema";
import { auth } from "../auth";
import db from "../db/drizzle";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await db
      .delete(PostType)
      .where(
        and(eq(PostType.id, postId), eq(PostType.authorId, session.user.id))
      );

    revalidatePath(`/${session.user.id}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}
