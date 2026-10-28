import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('common')
  const { theme, toggle } = useTheme()
  const Icon = theme === 'dark' ? IconSun : IconMoon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
      className={cn(
        'inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <Icon className="size-4" aria-hidden stroke={1.75} />
    </button>
  )
}
