// Thin, safe wrapper around GA4's gtag() for firing custom events from
// client components (e.g. social link clicks). No-ops if GA4 hasn't
// loaded — no Measurement ID set, script blocked, or still loading.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("event", name, params)
}
