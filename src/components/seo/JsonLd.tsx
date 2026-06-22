import { SITE } from '@/data/content'

const SEO_DESCRIPTION =
  'LazyNevis is a privacy-first desktop focus tool. It watches the active window during a session, classifies your time as focused or distracted, and nudges you when you drift — without ever blocking an app or sending data anywhere.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  description: SEO_DESCRIPTION,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'macOS, Windows, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  license: 'https://opensource.org/licenses/MIT',
  url: SITE.url,
  downloadUrl: SITE.releasesUrl,
  softwareHelp: SITE.discussionsUrl,
  author: {
    '@type': 'Person',
    name: SITE.authorName,
    url: SITE.authorUrl,
    sameAs: [SITE.authorUrl, SITE.portfolioUrl],
  },
  codeRepository: SITE.repoUrl,
  featureList: [
    'Privacy-first local focus tracking',
    'Allowlist and blocklist window classification',
    'Native notifications and fullscreen overlay alerts',
    'Session history with JSON and CSV export',
    'No telemetry or cloud sync',
  ],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
