"use client";

import { Alert, AlertDescription } from "./alert";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { createPost } from "@/lib/functions/create-post";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

function NewPostForm({ onCancel }: { onCancel: () => void }) {
  const [error, setError] = useState<string | null>(null);

  const newPostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  });

  const newPostForm = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: newPostSchema,
    },
    onSubmit: async (values) => {
      setError(null);
      const { title, content } = values.value;
      const { success, error } = await createPost(title, content);
      if (error) {
        setError(error ?? "An unknown error occurred");
        return;
      }
      if (success) {
        onCancel();
      }
    },
  });

  return (
    <div className="border rounded-lg p-4 w-full bg-background">
      <div className="flex flex-col gap-4">
        <newPostForm.Field
          name="title"
          validators={{
            onChange: newPostSchema.shape.title,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </newPostForm.Field>
        <newPostForm.Field
          name="content"
          validators={{
            onChange: newPostSchema.shape.content,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={10}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
              {field.state.meta.errors.map((error, i) => (
                <Alert key={i} variant="destructive">
                  <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </newPostForm.Field>
        <div className="flex justify-between gap-2">
          <newPostForm.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDefaultValue,
            ]}
          >
            {([canSubmit, isSubmitting, isDefaultValue]) => (
              <Button
                className="flex-1"
                onClick={() => newPostForm.handleSubmit()}
                disabled={!canSubmit || isSubmitting || isDefaultValue}
              >
                {isSubmitting ? "Creating post..." : "Create Post"}
              </Button>
            )}
          </newPostForm.Subscribe>
          <Button variant="outline" onClick={() => onCancel()}>
            Cancel
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default NewPostForm;
