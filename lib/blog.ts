import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

// Where your Markdown posts live. To publish a new post, just drop a new
// `.md` file in this folder — no code changes required.
const POSTS_DIR = path.join(process.cwd(), "content/blog")

export type PostFrontmatter = {
  title: string
  description: string
  date: string // ISO string, e.g. "2026-01-14"
  tags?: string[]
  author?: string
  draft?: boolean
}

export type Post = PostFrontmatter & {
  slug: string
  html: string
  readingTime: number // minutes
}

export type PostMeta = PostFrontmatter & {
  slug: string
  readingTime: number
}

function readPostFile(fileName: string) {
  const slug = fileName.replace(/\.md$/, "")
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8")
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.round(words / 200))
  return { slug, frontmatter, content, readingTime }
}

function getFileNames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
}

// All published posts (drafts excluded), newest first.
export function getAllPosts(): PostMeta[] {
  return getFileNames()
    .map((fileName) => {
      const { slug, frontmatter, readingTime } = readPostFile(fileName)
      return { ...frontmatter, slug, readingTime }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Slugs used by generateStaticParams for static export.
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.md`
  const filePath = path.join(POSTS_DIR, fileName)
  if (!fs.existsSync(filePath)) return null
  const { frontmatter, content, readingTime } = readPostFile(fileName)
  const html = marked.parse(content, { async: false }) as string
  return { ...frontmatter, slug, html, readingTime }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
