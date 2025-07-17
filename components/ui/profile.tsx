import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { user as UserType } from "@/lib/db/schema";

function Profile({
  user,
}: {
  user: Pick<typeof UserType.$inferSelect, "name" | "email" | "image">;
}) {
  const { name, email, image } = user;

  return (
    <div className="border rounded-lg flex items-center gap-4 bg-background">
      <div className="p-4 border-r">
        <Avatar className="border w-12 h-12">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback className="text-lg font-semibold">
            {name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500 ">{email}</p>
      </div>
    </div>
  );
}

export default Profile;
