import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { NextIntlClientProvider } from 'next-intl'

import { type Locale } from './config'
import { detectLocale, persistLocale } from './detect-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const messageLoaders: Record<
  Locale,
  () => Promise<{ default: Record<string, unknown> }>
> = {
  'en-US': () => import('./messages/en-US.json'),
  'pt-BR': () => import('./messages/pt-BR.json'),
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale())
  const [messages, setMessages] = useState<Record<string, unknown> | null>(
    null,
  )

  useEffect(() => {
    let cancelled = false
    void messageLoaders[locale]().then((mod) => {
      if (!cancelled) setMessages(mod.default)
    })
    return () => {
      cancelled = true
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next)
    setLocaleState(next)
    document.documentElement.lang = next === 'pt-BR' ? 'pt-BR' : 'en'
  }, [])

  const contextValue = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  )

  if (!messages) {
    return (
      <div className="min-h-screen bg-background" aria-busy="true" aria-label="Loading" />
    )
  }

  return (
    <LocaleContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within I18nProvider')
  }
  return ctx
}
