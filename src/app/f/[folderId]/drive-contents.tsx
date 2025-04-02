"use client"

import { ChevronRight } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import type { files_table, folders_table } from "~/server/db/schema"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { UploadButton } from "~/components/uploadthing"
import { redirect, useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { createFolderAction } from "~/server/actions"
import { useState } from "react"
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
  
  if(!session.user) {
    redirect("/sign-in");
  }

  const handleCreateFolder = async () => {
    if (newFolderName.trim()) {
      try {
        await createFolderAction(newFolderName, props.currentFolderId);
        setNewFolderName("");
        setIsCreateFolderOpen(false);
        navigate.refresh();
      } catch (error) {
        console.error("Failed to create folder:", error);
        // Optionally add error handling UI here
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
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
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
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
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
              
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <div className="mt-4 flex gap-4">
          <UploadButton endpoint={"driveUploader"} onClientUploadComplete={() => {navigate.refresh()}} input={{
            folderId: props.currentFolderId
          }} />
          <Button onClick={() => setIsCreateFolderOpen(true)}>Create folder here</Button>
        </div>
        
        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
          <DialogContent className="bg-gray-800 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="bg-gray-700 border-gray-600"
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
              <Button onClick={handleCreateFolder}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>  
    </div>
  )
}

