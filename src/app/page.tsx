import { db } from "~/server/db"
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema"
import DriveContents from "./drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(fileSchema);
  const folders = await db.select().from(folderSchema);
  return (
    <DriveContents files={files} folders={folders} />
  ) 
}

