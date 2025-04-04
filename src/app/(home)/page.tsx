import { auth } from "@clerk/nextjs/server";
import { Upload } from "lucide-react"
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button"

export default function UploadifyHomepage() {
  return (
    <>
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-8">
            <Upload className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">Uploadify</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
            Store, share, and collaborate on files with ease
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl mb-10 max-w-2xl">
            Uploadify gives you secure cloud storage, seamless file sharing, and powerful collaboration tools in one
            platform.
          </p>
          <form action={ async () => {
            "use server";
            const session = await auth();
            if(!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");

          }}>
            <Button

              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">Get Started
            </Button>
          </form>
          <div className="mt-4 text-neutral-500 text-sm">Free plan available. No credit card required.</div>
        </div>
      </>
  )
}

