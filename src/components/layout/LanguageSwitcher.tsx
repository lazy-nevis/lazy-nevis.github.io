import { localeLabels, locales, type Locale } from '@/i18n/config'
import { useLocale } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-border bg-card/50 p-0.5',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc as Locale)}
          className={cn(
            'rounded-full px-2.5 py-1 text-label-sm transition-colors duration-200 cursor-pointer',
            locale === loc
              ? 'bg-primary-container text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-pressed={locale === loc}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  )
}
