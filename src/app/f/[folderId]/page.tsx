import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db"
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema"

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while(currentId !== null) {
    const folder = await db.select().from(folderSchema).where(eq(folderSchema.id, currentId));
    if(!folder[0]) {
      throw new Error("Parent folder not found");
    }
    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;

  }
  return parents;
}

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}>}) {
  const params = await props.params;

  const paresedFolderId = parseInt(params.folderId);
  if(isNaN(paresedFolderId)) {
    return <div>Invalid folder id</div>
  }

  const foldersPromise = db.select().from(folderSchema).where(eq(folderSchema.parent, paresedFolderId));
  
  const filesPromise = db.select().from(fileSchema).where(eq(fileSchema.parent, paresedFolderId));

  const parentsPromise = getAllParents(paresedFolderId);

  const [ folders, files, parents ] = await Promise.all([foldersPromise, filesPromise, parentsPromise]);
  return (
    <DriveContents files={files} folders={folders} parents={parents} />
  ) 
}

