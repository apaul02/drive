import { Folder as FolderIcon, File as FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button"; 
import { deleteFile, deleteFolderAction } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";
import RenameFolderButton from "./rename-folder-button"; 

const listItemBaseStyles = "px-6 py-4 border-b rounded-md border-gray-300 bg-gray-100 hover:bg-gray-200";
const primaryTextColor = "text-gray-800";
const secondaryTextColor = "text-gray-600";
const linkStyles = `flex items-center ${primaryTextColor} hover:text-blue-600 truncate`; 

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  return (
    <li key={file.id} className={listItemBaseStyles}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className={linkStyles}
            target="_blank"
            rel="noopener noreferrer"
            title={file.name}
          >
            <FileIcon className="mr-3 flex-shrink-0" size={20} />
            <span className="truncate">{file.name}</span>
          </a>
        </div>
        <div className={`col-span-2 ${secondaryTextColor}`}>{"File"}</div>
        <div className={`col-span-2 ${secondaryTextColor}`}>{file.size}</div>
        <div className={`col-span-2 flex justify-end ${secondaryTextColor}`}> 
          <Button
            variant={"ghost"} 
            onClick={() => deleteFile(file.id)}
            aria-label="Delete File"
            size="sm"
            className="hover:bg-gray-300" 
          >
            <Trash2Icon size={18} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: { folder: typeof folders_table.$inferSelect }) {
  const { folder } = props;
  return (
    <li key={folder.id} className={listItemBaseStyles}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className={linkStyles}
            title={folder.name}
          >
            <FolderIcon className="mr-3 flex-shrink-0" size={20} />
            <span className="truncate">{folder.name}</span>
          </Link>
        </div>
        <div className="col-span-2"></div> 
        <div className="col-span-2"></div> 
        <div className={`col-span-2 flex justify-end items-center gap-1 ${secondaryTextColor}`}>
          <RenameFolderButton previousName={folder.name} folderId={folder.id} />
          <Button
            variant={"ghost"}
            onClick={() => deleteFolderAction(folder.id)}
            aria-label="Delete Folder"
            size="sm"
             className="hover:bg-gray-300"
          >
            <Trash2Icon size={18} />
          </Button>
        </div>
      </div>
    </li>
  );
}