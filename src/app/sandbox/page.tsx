import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default async function SandBox() {
  const user = await auth();
  if(!user.userId) {
    throw new Error("Unauthorized");
  }
  const folders = await db.select().from(folders_table).where(eq(folders_table.ownerId, user.userId))
  
  console.log(folders);
 return (
  <div>
    <form action={async () => {
      "use server";
      const user = await auth();
      if(!user.userId) {
        throw new Error("Unauthorized");
      }
      const rootFolder = await db.insert(folders_table).values({
        name: "root",
        ownerId: user.userId,
        parent: null
    }).$returningId();


      const insertableFolders = mockFolders.map((folder) => ({
        name: folder.name,
        parent: rootFolder[0]!.id,
        ownerId: user.userId
      }))
      await db.insert(folders_table).values(insertableFolders);
    }}>

      <button type="submit">Submit</button>
    </form>
  </div>
 ) 
}