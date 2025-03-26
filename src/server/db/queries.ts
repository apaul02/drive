import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db"
import { files_table as fileSchema, folders_table as folderSchema } from "~/server/db/schema"

export async function getAllParentsForFolder(folderId: number) {
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

export function getFolders(folderId: number) {
  return db.select().from(folderSchema).where(eq(folderSchema.parent, folderId)).orderBy(folderSchema.id); ;
}
  
export function getFiles(folderId: number) {
  return db.select().from(fileSchema).where(eq(fileSchema.parent, folderId)).orderBy(fileSchema.id); 
}

export async function getFolderById(folderId: number) {
  const folder = await db.select().from(folderSchema).where(eq(folderSchema.id, folderId));
  return folder[0];
}

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string
  }) {
    return db.insert(fileSchema).values({
      ...input.file,
      ownerId: input.userId
    });
  }
}
  


