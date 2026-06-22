import { defaultLocale, type Locale } from './config'

const STORAGE_KEY = 'lazy-nevis-locale'

/** ISO 3166-1 alpha-2 regions where Portuguese is an official language */
const PT_REGIONS = new Set([
  'pt', // Portugal
  'br', // Brazil
  'ao', // Angola
  'mz', // Mozambique
  'cv', // Cape Verde
  'gw', // Guinea-Bissau
  'st', // São Tomé and Príncipe
  'tl', // Timor-Leste
  'gq', // Equatorial Guinea
  'mo', // Macau (often pt in browser prefs)
])

function isPortuguesePreference(lang: string): boolean {
  const lower = lang.toLowerCase()
  if (lower.startsWith('pt')) return true
  const region = lower.split('-')[1]
  return region !== undefined && PT_REGIONS.has(region)
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en-US' || stored === 'pt-BR') return stored

  if (isPortuguesePreference(navigator.language)) return 'pt-BR'

  for (const lang of navigator.languages) {
    if (isPortuguesePreference(lang)) return 'pt-BR'
  }

  return defaultLocale
}

export function persistLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale)
}

export function getStoredLocale(): Locale | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en-US' || stored === 'pt-BR') return stored
  return null
}
