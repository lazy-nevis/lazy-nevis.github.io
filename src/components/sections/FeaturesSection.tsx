import { FEATURE_ICON_MAP } from '@/components/icons'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FEATURE_ICONS, FEATURE_KEYS, HOW_IT_WORKS_STEP_KEYS } from '@/data/content'
import { useReducedMotion } from '@/hooks/use-ui'
import { cn } from '@/lib/utils'

function FeatureCard({ featureKey }: { featureKey: (typeof FEATURE_KEYS)[number] }) {
  const t = useTranslations('features.items')
  const iconName = FEATURE_ICONS[featureKey]
  const Icon = FEATURE_ICON_MAP[iconName] ?? FEATURE_ICON_MAP.Shield

  return (
    <Card className="h-full transition-colors duration-200 hover:border-primary-container/25 cursor-default">
      <CardHeader className="p-5 sm:p-6">
        <div className="mb-4 flex size-11 sm:size-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary-container">
          <Icon className="size-6" aria-hidden stroke={1.75} />
        </div>
        <CardTitle>{t(`${featureKey}.title`)}</CardTitle>
        <CardDescription>{t(`${featureKey}.description`)}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export function FeaturesSection() {
  const t = useTranslations('features')
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <Section id="features">
      <SectionHeader
        title={t('title')}
        description={t('description')}
        centered
      />

      {isMobile && !reduced ? (
        <Swiper spaceBetween={16} slidesPerView={1.15} className="!overflow-visible">
          {FEATURE_KEYS.map((key) => (
            <SwiperSlide key={key}>
              <FeatureCard featureKey={key} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((key) => (
            <FeatureCard key={key} featureKey={key} />
          ))}
        </div>
      )}
    </Section>
  )
}

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  const ref = useRef<HTMLOListElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <Section id="how-it-works">
      <SectionHeader
        title={t('title')}
        description={t('description')}
        centered
      />

      <ol
        ref={ref}
        className="mx-auto max-w-2xl space-y-3 border-l border-border pl-5 sm:pl-6"
      >
        {HOW_IT_WORKS_STEP_KEYS.map((stepKey, index) => (
          <li
            key={stepKey}
            className={cn(
              'relative pl-2 motion-safe:transition-all motion-safe:duration-300',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
            style={
              visible && !reduced
                ? { transitionDelay: `${index * 50}ms` }
                : undefined
            }
          >
            <span
              className={cn(
                'absolute -left-[1.6rem] top-0.5 flex size-6 items-center justify-center sm:-left-[1.85rem] sm:size-7',
                'rounded-full bg-primary-container text-primary-foreground',
                'text-label-sm font-bold ring-2 ring-background',
              )}
            >
              {stepKey}
            </span>
            <h3 className="text-body-md font-semibold text-foreground leading-snug">
              {t(`steps.${stepKey}.title`)}
            </h3>
            <p className="mt-0.5 text-label-md text-muted-foreground leading-relaxed">
              {t(`steps.${stepKey}.description`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
