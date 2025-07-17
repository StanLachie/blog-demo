"use client";

import { Button } from "./button";
import { deletePost } from "@/lib/functions/delete-post";

function DeletePost({ postId }: { postId: string }) {
  return (
    <Button variant="destructive" size="sm" onClick={() => deletePost(postId)}>
      Delete
    </Button>
  );
}

export default DeletePost;
