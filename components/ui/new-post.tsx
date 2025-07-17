"use client";

import { Button } from "./button";
import NewPostForm from "./new-post-form";
import { useState } from "react";

function NewPost() {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  if (!expanded) {
    return (
      <Button onClick={handleExpand} size="lg" className="w-full">
        New Post
      </Button>
    );
  }

  return <NewPostForm onCancel={handleExpand} />;
}

export default NewPost;
