import { IconBrandGithub, IconDownload } from '@/components/icons'
import { AppShot } from '@/components/ui/app-shot'
import { Button } from '@/components/ui/button'
import { SITE } from '@/data/content'
import { useTranslations } from 'next-intl'

const TRUST_KEYS = ['free', 'offline', 'platforms'] as const

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-16 md:pt-[4.5rem]"
      aria-labelledby="hero-heading"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-container pt-12 pb-6 text-center md:pt-20">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-label-sm text-primary backdrop-blur-sm motion-safe:animate-fade-in-up">
          <span className="size-1.5 rounded-full bg-primary-container" aria-hidden />
          {t('badge')}
        </p>

        <h1
          id="hero-heading"
          className="mx-auto mt-6 max-w-4xl text-balance text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground motion-safe:animate-fade-in-up sm:text-6xl lg:text-7xl"
        >
          {t('title')} <span className="text-gradient">{t('titleAccent')}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-body-lg text-muted-foreground motion-safe:animate-fade-in-up">
          {t('description')}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#install">
              <IconDownload aria-hidden stroke={1.75} />
              {t('ctaDownload')}
            </a>
          </Button>
          <Button variant="secondary" asChild size="lg" className="w-full sm:w-auto">
            <a href={SITE.repoUrl} target="_blank" rel="noopener noreferrer">
              <IconBrandGithub className="size-4" aria-hidden stroke={1.75} />
              {t('ctaGithub')}
            </a>
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label-md text-muted-foreground">
          {TRUST_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-primary-container" aria-hidden />
              {t(`trust.${key}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto max-w-6xl px-container pb-10 md:pb-16">
        <div className="relative">
          <div
            className="absolute inset-x-8 -top-6 h-40 rounded-full bg-primary-container/20 blur-3xl"
            aria-hidden
          />
          <AppShot
            id="dashboardRunning"
            alt={t('shotAlt')}
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="shot-frame relative motion-safe:animate-fade-in-up"
          />

          <div
            className="absolute -right-2 bottom-6 hidden w-[17%] min-w-28 animate-drift md:block lg:-right-6"
            style={{ '--r': '3deg' } as React.CSSProperties}
          >
            <AppShot id="trayRunning" alt={t('trayAlt')} className="shot-frame rounded-2xl" />
          </div>
          <div
            className="absolute -left-2 bottom-2 hidden w-[15%] min-w-24 animate-drift [animation-delay:-3s] md:block lg:-left-6"
            style={{ '--r': '-3deg' } as React.CSSProperties}
          >
            <AppShot id="compactRunning" alt={t('compactAlt')} className="shot-frame rounded-2xl" />
          </div>
        </div>

        <p className="mt-6 text-center text-label-sm text-muted-foreground">{t('tagline')}</p>
      </div>
    </section>
  )
}
