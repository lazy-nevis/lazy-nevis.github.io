import { useTranslations } from 'next-intl'

import { BrandLogo } from '@/components/layout/BrandLogo'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { IconBrandGithub, IconCoffee, IconMessageCircle } from '@/components/icons'
import { SITE } from '@/data/content'

const linkClass =
  'text-body-md text-muted-foreground transition-colors hover:text-foreground cursor-pointer'

export function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const year = new Date().getFullYear()

  const sections = [
    { href: '#features', label: nav('features') },
    { href: '#install', label: nav('install') },
    { href: '#screenshots', label: nav('screenshots') },
    { href: '#faq', label: nav('faq') },
  ]

  return (
    <footer className="relative z-10 border-t border-border bg-surface-container-lowest py-section">
      <div className="mx-auto max-w-7xl px-container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="max-w-sm space-y-4">
            <BrandLogo className="h-9 w-auto sm:h-10" decorative={false} />
            <p className="text-body-md text-muted-foreground">{t('tagline')}</p>
            <a
              href={SITE.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-label-md text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              <IconCoffee className="size-4 text-warning" aria-hidden stroke={1.75} />
              {t('buyCoffee')}
            </a>
          </div>

          <nav aria-label={t('explore')} className="space-y-4">
            <p className="text-label-md text-foreground">{t('explore')}</p>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-label-md text-foreground">{t('links')}</p>
            <ul className="space-y-3">
              <li>
                <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <IconBrandGithub className="size-4" aria-hidden stroke={1.75} />
                  GitHub
                </a>
              </li>
              <li>
                <a href={SITE.discussionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <IconMessageCircle className="size-4" aria-hidden stroke={1.75} />
                  Discussions
                </a>
              </li>
              <li>
                <a href={SITE.privacyUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t('mitLicense')}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-start gap-3 md:flex-col md:items-end">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-label-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {year}{' '}
            <a href={SITE.authorUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer">
              {SITE.authorName}
            </a>
            {' · '}
            <a href={SITE.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer">
              {SITE.portfolioName}
            </a>
            . {t('copyright')}
          </p>
          <p>
            {t('landingAt')}{' '}
            <a href={SITE.url} className="text-primary hover:underline cursor-pointer">
              {new URL(SITE.url).host}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
