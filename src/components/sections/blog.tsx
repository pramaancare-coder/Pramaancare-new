export function Blog() {
  return (
    <section id="blog" className="w-full py-16 md:py-24 lg:py-32">
      <div className="w-[96%] mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
            Blog
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm lg:text-base xl:text-lg">
            This is a placeholder for the Blog section.
          </p>
        </div>
      </div>
    </section>
  );
}
