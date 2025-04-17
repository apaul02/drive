"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { deleteFile, deleteFolderAction } from "~/server/actions";

export default function DeleteFileButton(props: { fileId: number, fileName:string, isDisabled?: boolean }) {
  const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleDeleteFile = async () => {
    setLoading(true);
    try {
      await deleteFile(props.fileId);
      setDeleteDialog(false);
      navigate.refresh();
    } catch (error) {
      console.error("Failed to delete folder:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button 
        onClick={() => setDeleteDialog(true)} 
        variant="ghost" 
        size="sm" 
        className=" hover:bg-gray-300"
        disabled={props.isDisabled}
      >
        <Trash2 size={16} color="red" />
      </Button>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialog}>
        <DialogContent className="bg-gray-100 text-gray-900 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {props.fileName} ?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" className="cursor-pointer" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button className="min-w-[90px] cursor-pointer hover:bg-red-700" onClick={handleDeleteFile} disabled={isLoading} variant={"destructive"}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}