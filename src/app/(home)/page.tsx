import { auth } from "@clerk/nextjs/server";
import { ArrowRight, ChevronRight, Upload } from "lucide-react"
import { Funnel_Display, Poppins } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button"

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "500"
});

export default function UploadifyHomepage() {
  return (
    <div className={`${poppins.className} bg-white text-gray-900`}>
      <div className="min-h-screen flex flex-col ">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <Upload className="h-6 w-6 text-emerald-500" />
            <span>Uploadify</span>
          </div>
          <div className="ml-auto">
          <form action={ async () => {
            "use server";
            const session = await auth();
            if(!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");

          }}>
            <Button
              variant={"ghost"}
              type="submit"
              >Get Started
            </Button>
          </form>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Store, share, and access your files from anywhere
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Uploadify gives you secure cloud storage with seamless sharing capabilities, all in one simple platform.
            </p>
            
            <form action={ async () => {
            "use server";
            const session = await auth();
            if(!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");

          }}>
            <Button type="submit" size="lg" className=" group shadow-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-105  mt-8 px-8 py-6 text-lg bg-charcoal hover:bg-charcoal-100 ">
              <span className={`${funnelDisplay.className}`}>Get Started</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </form>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} Uploadify. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Terms
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-slate-700">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  </div>
  )
}

