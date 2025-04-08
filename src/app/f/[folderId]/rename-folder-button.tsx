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
        className="text-gray-400 hover:text-white"
      >
        <Pencil size={16} />
        <span className="ml-1"></span>
      </Button>
      
      <Dialog open={isFolderRenameOpen} onOpenChange={setIsFolderRenameOpen}>
        <DialogContent className="bg-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="bg-gray-700 border-gray-600"
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