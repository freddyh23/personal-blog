import Script from "next/script"

// Drop-in GA4 (Google Analytics 4) tag.
// It only renders when a Measurement ID is provided, so local dev and
// preview stay clean. Set NEXT_PUBLIC_GA_ID (e.g. "G-XXXXXXXXXX") in your
// host's environment once your GA4 property exists.
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
