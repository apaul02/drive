import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DriveContents from "~/app/f/[folderId]/drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/queries";


export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string}>}) {
  const { userId } = await auth();

  if(!userId) {
    redirect("/sign-in");
  }

  const params = await props.params;

  const paresedFolderId = parseInt(params.folderId);
  if(isNaN(paresedFolderId)) {
    return <div>Invalid folder id</div>
  }

  const [ folders, files, parents ] = await Promise.all([
    getFolders(paresedFolderId),
    getFiles(paresedFolderId), 
    getAllParentsForFolder(paresedFolderId)
  ]);
  return (
    <DriveContents files={files} folders={folders} parents={parents} currentFolderId={paresedFolderId} />
  ) 
}

