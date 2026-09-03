import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { PostCard } from "@/components/post-card"

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes from building a business in public — tasks, failures, wins, and everything that shapes the journey, documented as it happens.",
  alternates: { canonical: "/blog" },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          The journal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          Building a business, one entry at a time
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Every post is a real decision with the reasoning and, where I can
          share it, the numbers behind it.
        </p>
      </header>

      <section className="mt-12">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            No posts yet. Add a Markdown file to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              content/blog
            </code>{" "}
            to publish your first entry.
          </p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
