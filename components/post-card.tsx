import Link from "next/link"
import type { PostMeta } from "@/lib/blog"
import { formatDate } from "@/lib/blog"

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-t border-border py-6 first:border-t-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-balance transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          {post.description}
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-primary">
          Read post &rarr;
        </span>
      </Link>
    </article>
  )
}
