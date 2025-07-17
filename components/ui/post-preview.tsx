import type { post as PostType, user as UserType } from "@/lib/db/schema";

import { Button } from "./button";
import DeletePost from "./delete-post";
import Link from "next/link";
import { Separator } from "./separator";
import { auth } from "@/lib/auth";
import { deletePost } from "@/lib/functions/delete-post";
import { headers } from "next/headers";

async function PostPreview({
  post,
}: {
  post: Pick<
    typeof PostType.$inferSelect,
    "id" | "title" | "content" | "createdAt"
  > & {
    author: Pick<typeof UserType.$inferSelect, "id" | "name">;
  };
}) {
  const { id, title, content, createdAt, author } = post;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground ">
        Written by{" "}
        <Link href={`/${author.id}`} className="text-primary hover:underline">
          {author.name}
        </Link>{" "}
        on {createdAt?.toLocaleDateString()}
      </p>
      <Separator className="my-2" />
      <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      <div className="flex items-center mt-2 gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${author.id}/${id}`}>Read more</Link>
        </Button>
        {session?.user?.id === author.id && <DeletePost postId={id} />}
      </div>
    </div>
  );
}

export default PostPreview;
