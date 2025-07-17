import type { post as PostType, user as UserType } from "@/lib/db/schema";

import Link from "next/link";
import { Separator } from "./separator";

function Post({
  post,
}: {
  post: Pick<
    typeof PostType.$inferSelect,
    "title" | "content" | "createdAt"
  > & {
    author: Pick<typeof UserType.$inferSelect, "id" | "name">;
  };
}) {
  const { title, content, createdAt, author } = post;

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
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  );
}

export default Post;
