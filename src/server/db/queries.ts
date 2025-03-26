import "server-only";

import { and, eq, isNull } from "drizzle-orm";
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

export async function getRootFolderForUser(userId: string) {
  const folder = await db.select().from(folderSchema).where(and(eq(folderSchema.ownerId, userId), isNull(folderSchema.parent)));

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
  },

  onboardUser: async function (userId: string) {
    const rootFolder = await db.insert(folderSchema).values({
      name: "Root",
      parent: null,
      ownerId: userId
    }).$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(folderSchema).values([{
      name: "Documents",
      parent: rootFolderId,
      ownerId: userId
    }, {
      name: "Images",
      parent: rootFolderId,
      ownerId: userId
    }, {
      name: "Videos",
      parent: rootFolderId,
      ownerId: userId
    }, {
      name: "Music",
      parent: rootFolderId,
      ownerId: userId
    }])
    return rootFolderId;
  }
}
  


