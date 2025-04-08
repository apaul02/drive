"use server";
import "server-only"

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table, folders_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { MUTATIONS } from "./db/queries";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if(!session.userId) {
    return { error: "Unauthorized" };
  }
  
  const [file] = await db.select().from(files_table).where(and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)));

  if(!file) {
    return { error: "File not found" };
  }
  const utapiResult = await utApi.deleteFiles([file.url.replace("https://vngi78yeum.ufs.sh/f/", "")]);

  console.log(utapiResult);

  const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id, fileId));  

  console.log(dbDeleteResult);

  const c = await cookies();

  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function createFolderAction(name: string, parentId: number) {
  const session = await auth();
  if(!session.userId) {
    return { error: "Unauthorized" };
  }
  const folder = await MUTATIONS.createFolder({
    folder: {
      name,
      parent: parentId,
    },
    userId: session.userId,
  })
  if(!folder) {
    return { error: "Failed to create folder" };
  }

  // const c = await cookies();
  // c.set("force-refresh", JSON.stringify(Math.random()));
  return { success: true };
}

export async function renameFolderAction(name: string, folderId: number) {
  const session = await auth();
  if(!session.userId) {
    return { error: "Unauthorized" };
  }
  const folder = await MUTATIONS.renameFolder({folder: {name, folderId}});
  if(!folder) {
    return { error: "Failed to rename folder" };
  }
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
  return { success: true };
}

export async function deleteFolderAction(folderId: number) {
  try {
    const session = await auth();
    if(!session.userId) {
      return { error: "Unauthorized" };
    }
    const folderToDelete = await db.select().from(folders_table).where(and(eq(folders_table.id, folderId), eq(folders_table.ownerId, session.userId)));

    if(!folderToDelete) {
      return { error: "Folder not found" };
    }

    async function recursivelyDelete(currentFolderId: number) {

      const files = await db.select().from(files_table).where(eq(files_table.parent, currentFolderId));

      for(const file of files) {
        const utapiResult = await utApi.deleteFiles([file.url.replace("https://vngi78yeum.ufs.sh/f/", "")]);
        console.log(file.name);
        await db.delete(files_table).where(eq(files_table.id, file.id));
      }


      const subFolders = await db.select().from(folders_table).where(eq(folders_table.parent, currentFolderId));

      for(const subFolder of subFolders) {
        await recursivelyDelete(subFolder.id);
      }

      await db.delete(folders_table).where(eq(folders_table.id, currentFolderId))
    }

    await recursivelyDelete(folderId);
    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));

    return { success: true };

  }catch(error) {
    console.error("Error deleting folder:", error);
    return { error: "Failed to delete folder" };
  }
}