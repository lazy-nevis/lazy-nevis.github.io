import { FEATURE_ICON_MAP } from '@/components/icons'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Section, SectionHeader } from '@/components/layout/Section'
import { AppShot } from '@/components/ui/app-shot'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FEATURE_ICONS,
  FEATURE_KEYS,
  HOW_IT_WORKS_STEP_KEYS,
  PLANNER_ICONS,
  PLANNER_KEYS,
  PLANNER_SHOTS,
} from '@/data/content'
import { useReducedMotion } from '@/hooks/use-ui'
import { cn } from '@/lib/utils'

function FeatureCard({ featureKey }: { featureKey: (typeof FEATURE_KEYS)[number] }) {
  const t = useTranslations('features.items')
  const iconName = FEATURE_ICONS[featureKey]
  const Icon = FEATURE_ICON_MAP[iconName] ?? FEATURE_ICON_MAP.Shield

  return (
    <Card className="h-full transition-colors duration-200 hover:border-primary-container/40">
      <CardHeader className="p-5 sm:p-6">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
          <Icon className="size-6" aria-hidden stroke={1.75} />
        </div>
        <CardTitle className="text-body-lg font-semibold">{t(`${featureKey}.title`)}</CardTitle>
        <CardDescription>{t(`${featureKey}.description`)}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function PlannerCard({
  plannerKey,
  large,
}: {
  plannerKey: (typeof PLANNER_KEYS)[number]
  large: boolean
}) {
  const t = useTranslations('features.planner.items')
  const ts = useTranslations('screenshots.items')
  const Icon = FEATURE_ICON_MAP[PLANNER_ICONS[plannerKey]] ?? FEATURE_ICON_MAP.Shield
  const shotId = PLANNER_SHOTS[plannerKey]

  return (
    <article
      className={cn(
        'glass-panel group flex flex-col overflow-hidden rounded-2xl transition-colors duration-200 hover:border-primary-container/40',
        large ? 'lg:col-span-3' : 'lg:col-span-2',
      )}
    >
      <div className="p-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
          <Icon className="size-6" aria-hidden stroke={1.75} />
        </div>
        <h3 className="text-headline-md text-foreground">{t(`${plannerKey}.title`)}</h3>
        <p className="mt-2 text-body-md text-muted-foreground">{t(`${plannerKey}.description`)}</p>
      </div>
      <div className="relative mt-auto h-52 overflow-hidden px-4 sm:h-60 sm:px-6">
        <AppShot
          id={shotId}
          alt={ts(`${shotId}.alt`)}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="rounded-t-xl border border-b-0 border-border object-top transition-transform duration-500 motion-safe:group-hover:-translate-y-1"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent"
          aria-hidden
        />
      </div>
    </article>
  )
}

export function FeaturesSection() {
  const t = useTranslations('features')

  return (
    <Section id="features">
      <SectionHeader title={t('title')} description={t('description')} centered />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-5">
        {PLANNER_KEYS.map((key, i) => (
          <PlannerCard key={key} plannerKey={key} large={i === 0 || i === 3} />
        ))}
      </div>

      <h3 className="mt-14 mb-6 text-center text-headline-md text-foreground sm:mt-20">
        {t('focusTitle')}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {FEATURE_KEYS.map((key) => (
          <FeatureCard key={key} featureKey={key} />
        ))}
      </div>
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
