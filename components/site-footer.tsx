import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base font-medium">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="transition-colors hover:text-foreground"
              >
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-10">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Built as an SEO
          and analytics learning project.
        </p>
      </div>
    </footer>
  )
}
