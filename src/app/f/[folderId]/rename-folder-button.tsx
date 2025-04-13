"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { renameFolderAction } from "~/server/actions";
import { Pencil } from "lucide-react"; // Import pencil icon

export default function RenameFolderButton(props: { folderId: number, previousName: string }) {
  const [folderName, setFolderName] = useState(props.previousName);
  const [isFolderRenameOpen, setIsFolderRenameOpen] = useState(false);
  const navigate = useRouter();

  const handleRenameFolder = async () => {
    if(folderName.trim()) {
      try {
        await renameFolderAction(folderName, props.folderId);
        setFolderName("");
        setIsFolderRenameOpen(false);
        navigate.refresh();
      }catch (error) {
        console.error("Failed to rename folder:", error);
        // Optionally add error handling UI here
      }
    }
  }

  return (
    <>
      <Button 
        onClick={() => setIsFolderRenameOpen(true)} 
        variant="ghost" 
        size="sm" 
        className=" hover:bg-gray-300"
      >
        <Pencil size={16} />
      </Button>
      
      <Dialog open={isFolderRenameOpen} onOpenChange={setIsFolderRenameOpen}>
        <DialogContent className="bg-gray-100 text-gray-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="bg-white border-gray-300"
              autoFocus
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  await handleRenameFolder();
                };
              }}
            />
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsFolderRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameFolder}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}