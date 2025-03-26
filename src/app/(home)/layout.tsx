export default function UploadifyHomepage(props: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-black to-neutral-900">
        {props.children}
      </section>
    </div>
  )
}

