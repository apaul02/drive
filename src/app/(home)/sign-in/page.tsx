import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Upload } from "lucide-react"
import { redirect } from "next/navigation";

export default async function SignInPage() {
  
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
            <SignInButton forceRedirectUrl={"/drive"}  />
          <div className="mt-4 text-neutral-500 text-sm">Free plan available. No credit card required.</div>
        </div>
        </>
        )
}

