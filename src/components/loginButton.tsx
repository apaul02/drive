"use client"

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { ChevronRight, Loader2 } from "lucide-react"
import { Funnel_Display } from "next/font/google"
import { useState } from "react"
import { useRouter } from "next/navigation"

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "500",
})

export function LoginButton() {
  const [isDashboardLoading, setDashboardLoading] = useState(false)
  const router = useRouter()

  const handleGoToDashboard = () => {
    setDashboardLoading(true)
    router.push("/drive")
  }
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            size="lg"
            className="group shadow-none ring-black cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 mt-8 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg bg-charcoal hover:bg-charcoal-100"
          >
            <span className={`${funnelDisplay.className}`}>Get Started</span>
            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Button
          onClick={handleGoToDashboard}
          disabled={isDashboardLoading}
          size="lg"
          className="group shadow-none hover:[box-shadow:5px_5px_0px_rgb(0,0,0)] ring-black cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 mt-8 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg bg-charcoal hover:bg-charcoal-100"
        >
          <div className="flex items-center justify-center min-w-[160px] sm:min-w-[180px]">
            {isDashboardLoading ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
            ) : (
              <>
                <span className={`${funnelDisplay.className}`}>Go to Dashboard</span>
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-all duration-300" />
              </>
            )}
          </div>
        </Button>
      </SignedIn>
    </div>
  )
}
