import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am and what this site covers: my personal journey starting a business, documented as it happens.",
  alternates: { canonical: "/about" },
}

const credentials = [
  {
    name: "Google Ads Display Certification",
    issuer: "Google Skillshop",
    issueDate: "2026-08-26",
    expiryDate: "2027-08-26",
    verifyUrl:
      "https://skillshop.credential.net/ceabe7d7-4e3a-4bd1-8337-b8044e8cc51d",
    badge: "/badges/google-ads-display-badge.png",
  },
]

function formatCredentialDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

const highlights = [
  {
    name: "The tasks",
    summary:
      "What I'm actually working on week to week — the decisions, the to-do list, and the reasoning behind it.",
  },
  {
    name: "The failures",
    summary:
      "What didn't work, what I got wrong, and what I'd do differently next time. No cleaning it up after the fact.",
  },
  {
    name: "The wins",
    summary:
      "The moments things click, told with the numbers and context behind them, not just the headline.",
  },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header>
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-primary">
          About
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Hi, I&apos;m {siteConfig.name}
        </h1>
      </header>

      <div className="prose mt-8">
        <p>
          I&apos;m starting a business, and this site is where I&apos;m
          documenting the whole journey as it happens — the good parts and
          the messy ones.
        </p>
        <p>
          This whole site is an experiment. I&apos;m building in public and
          using these pages as a live lab to learn search and analytics along
          the way.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Credentials
        </h2>
        <div className="mt-4 grid gap-4">
          {credentials.map((credential) => (
            <div
              key={credential.name}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
            >
              <img
                src={credential.badge}
                alt={`${credential.name} badge`}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold tracking-tight">
                  {credential.name}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {credential.issuer} · Issued{" "}
                  {formatCredentialDate(credential.issueDate)} · Expires{" "}
                  {formatCredentialDate(credential.expiryDate)}
                </p>
                <a
                  href={credential.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
                >
                  Verify credential &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="prose mt-10">
        <h2>What this site covers</h2>
      </div>

      <div className="mt-6 grid gap-4">
        {highlights.map((highlight) => (
          <div
            key={highlight.name}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {highlight.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {highlight.summary}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-lg border border-primary/30 bg-accent/40 p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Want to follow along?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Read the journal for the latest entries, or reach out directly if
          you want to say hi.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the journal
          </Link>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Send an email
          </a>
        </div>
      </section>
    </main>
  )
}
