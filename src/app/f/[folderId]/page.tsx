import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db"
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema"

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}>}) {
  const params = await props.params;

  const paresedFolderId = parseInt(params.folderId);
  if(isNaN(paresedFolderId)) {
    return <div>Invalid folder id</div>
  } 
  console.log(params.folderId);
  const files = await db.select().from(fileSchema).where(eq(fileSchema.parent, paresedFolderId));
  const folders = await db.select().from(folderSchema).where(eq(folderSchema.parent, paresedFolderId));
  return (
    <DriveContents files={files} folders={folders} />
  ) 
}

