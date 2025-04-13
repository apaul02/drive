import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getRootFolderForUser, MUTATIONS } from "~/server/db/queries";
import { Poppins, Funnel_Display } from "next/font/google";
import { Button } from "~/components/ui/button";
import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CreateRootFolderButton } from "./createRootFolderButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "500",
});

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <div className={`${poppins.className} bg-gray-100 text-gray-900 min-h-screen flex flex-col`}>
        <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* You might want to keep the logo or a similar element here */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-slate-800">
              {/* Replace with your actual logo/icon */}
              {/* <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" /> */}
              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
              <span>Uploadify</span>
            </div>
            {/* You might want to keep a placeholder for potential header actions */}
            <div>
              <UserButton />
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800">
                {"It looks like you don't have a root folder yet. Let's create one for you to get started."}  
              </h1>
              {/* You can add a more descriptive paragraph here if needed */}
              {/* <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                Some additional information or context.
              </p> */}
              <CreateRootFolderButton />
            </div>
          </div>
        </main>

        <footer className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Uploadify. All rights reserved.
            </div>
            <div className="flex gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  return redirect(`/f/${rootFolder.id}`);
}