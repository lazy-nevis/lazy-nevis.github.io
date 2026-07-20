export const SITE = {
  name: 'LazyNevis',
  url: 'https://lazy-nevis.github.io',
  landingRepoUrl: 'https://github.com/lazy-nevis/lazy-nevis.github.io',
  repoUrl: 'https://github.com/lazy-nevis/lazy-nevis',
  releasesUrl: 'https://github.com/lazy-nevis/lazy-nevis/releases',
  discussionsUrl: 'https://github.com/lazy-nevis/lazy-nevis/discussions',
  contributingUrl:
    'https://github.com/lazy-nevis/lazy-nevis/blob/main/CONTRIBUTING.md',
  cocUrl: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/CODE_OF_CONDUCT.md',
  licenseUrl: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/LICENSE',
  privacyUrl: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/PRIVACY.md',
  buyMeACoffeeUrl: 'https://www.buymeacoffee.com/simstm',
  authorName: 'Lucas (SimStm)',
  authorUrl: 'https://github.com/SimStm',
  portfolioName: 'SIMSDEV',
  portfolioUrl: 'https://sims.dev.br',
} as const

export const NAV_HREFS = [
  { key: 'about', href: '#about' },
  { key: 'install', href: '#install' },
  { key: 'features', href: '#features' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'screenshots', href: '#screenshots' },
  { key: 'contribute', href: '#contribute' },
  { key: 'faq', href: '#faq' },
] as const

export const FEATURE_KEYS = [
  'session',
  'classification',
  'alerts',
  'audio',
  'breaks',
  'checklist',
  'history',
  'modes',
  'customization',
  'privacy',
] as const

export const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], string> = {
  session: 'Timer',
  classification: 'Target',
  alerts: 'Bell',
  audio: 'Volume2',
  breaks: 'Coffee',
  checklist: 'Checklist',
  history: 'History',
  modes: 'Layout',
  customization: 'Settings',
  privacy: 'Shield',
}

export const HOW_IT_WORKS_STEP_KEYS = ['1', '2', '3', '4', '5', '6'] as const

export const PILLAR_KEYS = ['localFirst', 'privacy', 'noTelemetry'] as const

export const PILLAR_ICONS = ['HardDrive', 'Lock', 'WifiOff'] as const

export type InstallPlatform = 'macos' | 'windows' | 'linux'

export const INSTALL_PLATFORMS: InstallPlatform[] = [
  'macos',
  'windows',
  'linux',
]

export const INSTALL_GUIDES: Record<InstallPlatform, string> = {
  macos:
    'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/install/macos.md',
  windows:
    'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/install/windows.md',
  linux:
    'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/install/linux.md',
}

export const INSTALL_TROUBLESHOOT: Record<
  InstallPlatform,
  { url: string; labelKey: string }
> = {
  macos: {
    url: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/troubleshooting/gatekeeper.md',
    labelKey: 'gatekeeper',
  },
  windows: {
    url: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/troubleshooting/smartscreen.md',
    labelKey: 'smartscreen',
  },
  linux: {
    url: 'https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/troubleshooting/linux-libraries.md',
    labelKey: 'linuxLibs',
  },
}

/**
 * Active capture set from the app repo:
 * `lazy-nevis/scripts/screenshots/out/<version>-<platform>/`
 * Copied into `public/screenshots/app/<version>-<platform>/` as WebP.
 * Keep older version folders for history; only change this constant + SCREENSHOTS
 * when promoting a new set.
 */
export const SCREENSHOT_SET = '0.10.0-rc.5-macos' as const

export type ScreenshotItem = {
  /** i18n key under `screenshots.items.*` */
  id: string
  src: string
  width: number
  height: number
}

function screenshotSrc(file: string): string {
  return `/screenshots/app/${SCREENSHOT_SET}/${file}.webp`
}

/** Curated gallery (dark theme preferred to match the landing). Full set lives on disk. */
export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'dashboardRunning',
    src: screenshotSrc('dashboard-running-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'dashboardIdle',
    src: screenshotSrc('dashboard-idle-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'history',
    src: screenshotSrc('history-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'historyDetail',
    src: screenshotSrc('history-detail-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'settings',
    src: screenshotSrc('settings-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'checklist',
    src: screenshotSrc('checklist-dark'),
    width: 1212,
    height: 932,
  },
  {
    id: 'fullscreenAlert',
    src: screenshotSrc('fullscreen-alert'),
    width: 1146,
    height: 826,
  },
  {
    id: 'compactRunning',
    src: screenshotSrc('compact-running-dark'),
    width: 492,
    height: 972,
  },
  {
    id: 'trayRunning',
    src: screenshotSrc('tray-running-dark'),
    width: 386,
    height: 526,
  },
  {
    id: 'about',
    src: screenshotSrc('about-dark'),
    width: 1212,
    height: 932,
  },
]

export const CONTRIBUTE_KEYS = [
  'issues',
  'prs',
  'discussions',
  'coc',
] as const

export const CONTRIBUTE_LINKS: Record<
  (typeof CONTRIBUTE_KEYS)[number],
  string
> = {
  issues: `${SITE.repoUrl}/issues`,
  prs: SITE.contributingUrl,
  discussions: SITE.discussionsUrl,
  coc: SITE.cocUrl,
}

export const FAQ_KEYS = [
  'block',
  'cloud',
  'classification',
  'platforms',
  'telemetry',
  'macosPerms',
  'crash',
  'license',
  'signed',
] as const
