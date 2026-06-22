export const SITE = {
  name: 'LazyNevis',
  url: 'https://lazy-nevis.github.io',
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
  'history',
  'customization',
  'privacy',
] as const

export const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], string> = {
  session: 'Timer',
  classification: 'Target',
  alerts: 'Bell',
  audio: 'Volume2',
  breaks: 'Coffee',
  history: 'History',
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

export type ScreenshotItem = {
  id: string
  src: string
  width: number
  height: number
}

export const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'dashboard',
    src: '/screenshots/webp/1-dashboard.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'startSession',
    src: '/screenshots/webp/2-start-session.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'history',
    src: '/screenshots/webp/3-session-history.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'historyDetail',
    src: '/screenshots/webp/4-session-history-details.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configGeneral',
    src: '/screenshots/webp/5-config-general.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configRules',
    src: '/screenshots/webp/6-config-rules.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'alertExample',
    src: '/screenshots/webp/7-alert-example.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configAudio',
    src: '/screenshots/webp/8-config-audio.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configBreaks',
    src: '/screenshots/webp/9-config-breaks.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configShortcuts',
    src: '/screenshots/webp/10-config-shortcuts.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configPermissions',
    src: '/screenshots/webp/11-config-permissions.webp',
    width: 1012,
    height: 792,
  },
  {
    id: 'configData',
    src: '/screenshots/webp/12-config-data.webp',
    width: 1012,
    height: 792,
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
