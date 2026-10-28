import { useTranslations } from 'next-intl'
import { useCallback, useRef, useState } from 'react'

import { Section, SectionHeader } from '@/components/layout/Section'
import { AppShot } from '@/components/ui/app-shot'
import { SCREENSHOTS, screenshotSrc } from '@/data/content'
import { useTheme } from '@/hooks/use-theme'
import { useReducedMotion } from '@/hooks/use-ui'
import { cn } from '@/lib/utils'

export function ScreenshotsSection() {
  const t = useTranslations('screenshots')
  const reducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const [active, setActive] = useState(0)
  const lightboxRef = useRef<import('photoswipe').default | null>(null)
  const current = SCREENSHOTS[active] ?? SCREENSHOTS[0]

  const openLightbox = useCallback(async () => {
    const PhotoSwipe = (await import('photoswipe')).default
    await import('photoswipe/style.css')

    lightboxRef.current?.destroy()

    const pswp = new PhotoSwipe({
      dataSource: SCREENSHOTS.map((shot) => ({
        src: screenshotSrc(shot, theme),
        width: shot.width,
        height: shot.height,
        alt: t(`items.${shot.id}.alt`),
      })),
      index: active,
      bgOpacity: 0.92,
      padding: { top: 20, bottom: 40, left: 12, right: 12 },
      showHideAnimationType: reducedMotion ? 'none' : 'zoom',
      mainClass: 'pswp--lazynevis',
    })
    pswp.addFilter('useContentPlaceholder', () => false)
    lightboxRef.current = pswp
    pswp.init()
  }, [active, reducedMotion, t, theme])

  const portrait = current.height > current.width

  return (
    <Section id="screenshots">
      <SectionHeader title={t('title')} description={t('description')} centered />

      <div
        role="tablist"
        aria-label={t('title')}
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {SCREENSHOTS.map((shot, index) => (
          <button
            key={shot.id}
            type="button"
            role="tab"
            id={`shot-tab-${shot.id}`}
            aria-selected={index === active}
            aria-controls="shot-panel"
            onClick={() => setActive(index)}
            className={cn(
              'shrink-0 cursor-pointer rounded-full border px-4 py-2 text-label-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              index === active
                ? 'border-primary-container bg-primary-container text-primary-foreground'
                : 'border-border bg-card/60 text-muted-foreground hover:text-foreground',
            )}
          >
            {t(`items.${shot.id}.tab`)}
          </button>
        ))}
      </div>

      <div
        id="shot-panel"
        role="tabpanel"
        aria-labelledby={`shot-tab-${current.id}`}
        className="relative mx-auto max-w-5xl"
      >
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
        <button
          type="button"
          onClick={() => void openLightbox()}
          aria-label={t('openFullscreen', { caption: t(`items.${current.id}.caption`) })}
          className="mx-auto block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
        >
          <AppShot
            key={current.id}
            id={current.id}
            alt={t(`items.${current.id}.alt`)}
            className={cn(
              'shot-frame mx-auto motion-safe:animate-fade-in-up',
              portrait ? 'max-h-[34rem] w-auto rounded-2xl' : 'rounded-xl',
            )}
          />
        </button>
        <p className="mt-6 text-center text-body-md text-muted-foreground">
          {t(`items.${current.id}.caption`)}
        </p>
      </div>
    </Section>
  )
}
