import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${siteConfig.url}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author ?? siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // Article structured data helps search engines understand the page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        // Structured data is a trusted, server-generated string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to journal
        </Link>
      </nav>

      <article>
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime} min read</span>
            <span aria-hidden="true">&middot;</span>
            <span>By {post.author ?? siteConfig.name}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* Rendered from Markdown at build time. */}
        <div
          className="prose mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <p className="font-serif text-lg font-medium">
          Building something similar?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          I document the whole journey here. See what I offer on the{" "}
          <Link
            href="/about"
            className="font-medium text-primary underline underline-offset-4"
          >
            about &amp; services
          </Link>{" "}
          page.
        </p>
      </div>
    </main>
  )
}
