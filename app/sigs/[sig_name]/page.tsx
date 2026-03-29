export default async function SigComingSoon({
  params,
}: {
  params: Promise<{ sig_name: string }>
}) {
  const { sig_name } = await params;
  const formattedSigName = sig_name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
            Coming <span className="text-primary">Soon</span>
          </h1>
          <div className="w-32 h-1 bg-secondary mx-auto rounded-full mb-6" />
        </div>
        
        <p className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
          {formattedSigName}
        </p>
        
        <p className="text-lg text-muted mb-8 max-w-md mx-auto">
          We're working hard to bring you something amazing. Stay tuned for updates!
        </p>

        <div className="flex items-center justify-center gap-2 text-muted">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm">In Development</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.5s]" />
        </div>
      </div>
    </main>
  );
}
  