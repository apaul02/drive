"use client"

import { ChevronRight, Loader2 } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import type { files_table, folders_table } from "~/server/db/schema"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { UploadButton, useUploadThing } from "~/components/uploadthing"
import { redirect, useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { createFolderAction } from "~/server/actions"
import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

export default function DriveContents(props: {
  files: typeof files_table.$inferSelect[],
  folders: typeof folders_table.$inferSelect[],
  parents: typeof folders_table.$inferSelect[],
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const session = useUser();
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [ isnNewFolderLoading, setIsNewFolderLoading] = useState(false);
  const [breadcrumbLoading, setBreadcrumbLoading] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  // const { user } = useUser();
  
  
  // if(!session.user) {
  //   redirect("/sign-in");
  // }

  if(!session.isLoaded) {
    return <div>Loading...</div>
  }

  const handleCreateFolder = async () => {  
    if (newFolderName.trim()) {
      try {
        setIsNewFolderLoading(true);
        await createFolderAction(newFolderName, props.currentFolderId);
        setNewFolderName("");
        navigate.refresh();
        setIsNewFolderLoading(false);
        setIsCreateFolderOpen(false);
      } catch (error) {
        console.error("Failed to create folder:", error);
        // Optionally add error handling UI here
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {/* <Link
              href={"/f/1"}
              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Link> */}
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-900" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-900 hover:text-blue-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setBreadcrumbLoading(folder.id);
                    startTransition(() => {
                      navigate.push(`/f/${folder.id}`);
                      setBreadcrumbLoading(null);
                    });
                  }}
                >
                  <div className="flex items-center gap-1">
                  <span className="text-gray-900 hover:text-blue-600">{folder.name}</span>
                  {breadcrumbLoading === folder.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ): null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
        </div>
        <div className="bg-gray-100 rounded-lg border border-gray-300">
          <div className="px-6 py-4 border-b border-gray-300">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder}  />
              
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <div className="mt-4 flex gap-4">
          <UploadButton endpoint={"driveUploader"} className="ut-button:transition-all ut-button:ease-in-out ut-button:duration-300 ut-button:bg-red-500 ut-button:hover:scale-105 ut-button:hover:[box-shadow:5px_5px_0px_rgb(0,0,0)]" onClientUploadComplete={() => {navigate.refresh()}} input={{
            folderId: props.currentFolderId
          }} />
          <Button onClick={() => setIsCreateFolderOpen(true)}>Create folder here</Button>
        </div>
        
        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
          <DialogContent className="bg-gray-100 text-gray-900 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="bg-white border-gray-300"
                autoFocus
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    await handleCreateFolder();
                  };
                }}
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                Cancel
              </Button>
              <Button className="min-w-[90px]" onClick={handleCreateFolder} disabled={isnNewFolderLoading}>
                {isnNewFolderLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>  
    </div>
  )
}

