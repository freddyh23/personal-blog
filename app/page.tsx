import Link from "next/link"
import { getAllPosts, formatDate } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"
import { PostCard } from "@/components/post-card"

export default function HomePage() {
  const posts = getAllPosts()
  const [latest, ...rest] = posts

  return (
    <main className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          A journal, in public
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          I&apos;m {siteConfig.name}. This is where I document my journey
          starting a business — the tasks I take on, the failures, the wins,
          and everything else that shapes the way.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the journal
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            About &amp; services
          </Link>
        </div>
      </section>

      {/* Latest post highlight */}
      {latest && (
        <section aria-labelledby="latest-heading" className="py-8">
          <h2
            id="latest-heading"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Latest entry
          </h2>
          <Link
            href={`/blog/${latest.slug}`}
            className="group mt-4 block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <time dateTime={latest.date}>{formatDate(latest.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{latest.readingTime} min read</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-balance transition-colors group-hover:text-primary">
              {latest.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
              {latest.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Continue reading &rarr;
            </span>
          </Link>
        </section>
      )}

      {/* More posts */}
      {rest.length > 0 && (
        <section aria-labelledby="more-heading" className="py-8">
          <h2
            id="more-heading"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            More from the journal
          </h2>
          <div className="mt-2">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
