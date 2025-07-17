import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: "file:./db.sqlite",
});
const db = drizzle(client);

export default db;
