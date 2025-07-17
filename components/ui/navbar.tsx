"use client";

import { Button } from "./button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function Navbar() {
  const { data: session } = authClient.useSession();

  return (
    <div className="border-b bg-background px-4 py-2 flex justify-between">
      <Link href="/" className="text-xl font-semibold">
        Blog Demo
      </Link>
      <div className="flex items-center gap-2">
        {session ? (
          <>
            <Button variant="outline" asChild>
              <Link href={`/${session.user.id}`}>My Blog</Link>
            </Button>
            <Button
              onClick={() => {
                authClient.signOut().then(() => {
                  redirect("/");
                });
              }}
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
