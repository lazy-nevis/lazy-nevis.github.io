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

/** Planner features shown as screenshot cards (bento). `shot` is a SCREENSHOTS id. */
export const PLANNER_KEYS = ['pomodoro', 'habits', 'reminders', 'calendar'] as const

export const PLANNER_SHOTS: Record<(typeof PLANNER_KEYS)[number], string> = {
  pomodoro: 'pomodoro',
  habits: 'habits',
  reminders: 'reminders',
  calendar: 'calendar',
}

export const PLANNER_ICONS: Record<(typeof PLANNER_KEYS)[number], string> = {
  pomodoro: 'Pomodoro',
  habits: 'Habits',
  reminders: 'Bell',
  calendar: 'Calendar',
}

export const FEATURE_KEYS = [
  'session',
  'classification',
  'alerts',
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

/** Official install scripts from the app repo (single source for UI + helpers). */
export const INSTALL_SCRIPT_URLS = {
  sh: 'https://raw.githubusercontent.com/lazy-nevis/lazy-nevis/refs/heads/main/scripts/install.sh',
  ps1: 'https://raw.githubusercontent.com/lazy-nevis/lazy-nevis/refs/heads/main/scripts/install.ps1',
} as const

export type InstallChannel = 'stable' | 'prerelease'

export function getInstallCommand(
  platform: InstallPlatform,
  channel: InstallChannel,
): string {
  const prerelease = channel === 'prerelease'
  if (platform === 'windows') {
    const base = `& ([scriptblock]::Create((iwr '${INSTALL_SCRIPT_URLS.ps1}' -UseBasicParsing).Content))`
    return prerelease ? `${base} -Prerelease` : base
  }
  const base = `bash <(curl -fL ${INSTALL_SCRIPT_URLS.sh})`
  return prerelease ? `${base} --prerelease` : base
}

export const LINUX_DEPS_CMD =
  'sudo apt-get install libwebkit2gtk-4.1-0 libgtk-3-0 libayatana-appindicator3-1'

/**
 * Active capture set from the app repo (`docs/screenshots/macos/`, app 1.0.1 (stable)
 * Copied into `public/screenshots/app/<SCREENSHOT_SET>/` as WebP. Keep older version
 * folders for history; only change this constant + SCREENSHOTS when promoting a new set.
 */
export const SCREENSHOT_SET = '1.0.1-macos' as const

export type ScreenshotItem = {
  /** i18n key under `screenshots.items.*` */
  id: string
  /** File stem inside the set folder (without `-dark` / `-light` / `.webp`) */
  file: string
  /** True when the set ships `<file>-dark.webp` and `<file>-light.webp` */
  themed: boolean
  width: number
  height: number
}

export function screenshotSrc(shot: ScreenshotItem, theme: 'light' | 'dark'): string {
  const name = shot.themed ? `${shot.file}-${theme}` : shot.file
  return `/screenshots/app/${SCREENSHOT_SET}/${name}.webp`
}

const WIDE = { width: 1600, height: 939 } as const

/** Curated gallery. Both themes are shipped; the site picks the one matching its theme. */
export const SCREENSHOTS: ScreenshotItem[] = [
  { id: 'dashboardRunning', file: 'dashboard-running', themed: true, ...WIDE },
  { id: 'pomodoro', file: 'pomodoro', themed: true, ...WIDE },
  { id: 'habits', file: 'habits', themed: true, ...WIDE },
  { id: 'reminders', file: 'reminders', themed: true, ...WIDE },
  { id: 'calendar', file: 'calendar', themed: true, ...WIDE },
  { id: 'checklist', file: 'checklist', themed: true, ...WIDE },
  { id: 'history', file: 'history', themed: true, ...WIDE },
  { id: 'compactRunning', file: 'compact-running', themed: true, width: 512, height: 1012 },
  { id: 'trayRunning', file: 'tray-running', themed: true, width: 386, height: 526 },
  { id: 'fullscreenAlert', file: 'fullscreen-alert', themed: false, width: 1146, height: 826 },
]

export function getScreenshot(id: string): ScreenshotItem {
  const shot = SCREENSHOTS.find((s) => s.id === id)
  if (!shot) throw new Error(`Unknown screenshot id: ${id}`)
  return shot
}

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
  'planner',
  'account',
  'platforms',
  'telemetry',
  'macosPerms',
  'crash',
  'license',
  'signed',
] as const
