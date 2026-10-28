import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'lazynevis-theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

function currentTheme(): Theme {
  const explicit = document.documentElement.dataset.theme
  return explicit === 'light' || explicit === 'dark' ? explicit : systemTheme()
}

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  mq.addEventListener('change', onChange)
  return () => {
    observer.disconnect()
    mq.removeEventListener('change', onChange)
  }
}

/** Resolved theme: the explicit choice if any, otherwise the OS preference. */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => 'dark')

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  }, [])

  return { theme, toggle }
}
