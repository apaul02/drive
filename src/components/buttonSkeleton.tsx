import { Button } from "~/components/ui/button";

export function ButtonSkeleton() {
  return (
    <Button
      size="lg"
      disabled 
      aria-hidden="true" // Hide from screen readers during loading
      className="shadow-none ring-black cursor-default mt-8 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg bg-gray-300 animate-pulse" // Use a skeleton background color (e.g., gray-300) and add pulse animation
    >
      {/*
        This inner div matches the structure and minimum width/height
        used inside the SignedIn state of your actual LoginButton
        to ensure the skeleton has the same dimensions.
      */}
      <div className="flex items-center justify-center min-w-[160px] sm:min-w-[180px] h-6 sm:h-7">
        {/* Use a non-breaking space to ensure the div takes up height */}
        &nbsp;
      </div>
    </Button>
  );
}