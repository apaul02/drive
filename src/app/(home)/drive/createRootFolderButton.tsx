"use client";

import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Loader2 } from "lucide-react";
import { Funnel_Display } from "next/font/google";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { onBoardUserAction } from "~/server/actions";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "500",
})

export function CreateRootFolderButton() {
  const [isRootFolderLoading, setRootFolderLoading] = useState(false);
  async function handleRootFolderCreation() {
    setRootFolderLoading(true);
    const res = await onBoardUserAction();
    if (res.error) {
      console.error(res.error);
      setRootFolderLoading(false);
      return;
    }
    if(res.success){
      console.log("Root folder created successfully");
      redirect(`f/${res.rootFolderId}`);
    }

  }
  return (
    <div>
      <form action={handleRootFolderCreation}>
      <Button
          onClick={handleRootFolderCreation}
          disabled={isRootFolderLoading}
          type="submit"
          size="lg"
          className="group shadow-none hover:[box-shadow:5px_5px_0px_rgb(0,0,0)] ring-black cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 mt-8 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg bg-charcoal hover:bg-charcoal-100"
        >
          <div className="flex items-center justify-center min-w-[160px] sm:min-w-[180px]">
            {isRootFolderLoading ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <>
                <span className={`${funnelDisplay.className}`}>Create Root Folder</span>
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-all duration-300" />
              </>
            )}
          </div>
        </Button>
      </form>

    </div>
  )
}