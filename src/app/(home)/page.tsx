import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Upload } from "lucide-react";
import { Funnel_Display, Poppins } from "next/font/google";
import Link from "next/link";
import { LoginButton } from "~/components/loginButton";
import { Button } from "~/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "500",
});




export default function UploadifyHomepage() {
  return (
    <div className={`${poppins.className} bg-gray-100 text-gray-900`}>
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-slate-800">
              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
              <span>Uploadify</span>
            </div>
            <div>
                <SignedOut>
                  <SignInButton mode="modal">
                  <Button
                  className="shadow-none ring-black cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 bg-charcoal hover:bg-charcoal-100 text-sm sm:text-base"
                  type="submit"
                >
                  Sign in
                </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/drive">
                    <Button
                  className="shadow-none ring-black cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 bg-charcoal hover:bg-charcoal-100 text-sm sm:text-base"
                  type="submit"
                >
                  Dashboard
                </Button>
                  </Link>
              </SignedIn>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800">
                Store, share, and access your files from  
                <span className={``}> anywhere</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
                Uploadify gives you secure cloud storage with seamless sharing
                capabilities, all in one simple platform.
              </p>
                <LoginButton />
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
    </div>
  );
}