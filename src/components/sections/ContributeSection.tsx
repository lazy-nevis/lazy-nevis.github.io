import { useTranslations } from 'next-intl'

import {
  IconBrandGithub,
  IconExternalLink,
  IconMessageCircle,
} from '@/components/icons'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CONTRIBUTE_KEYS, CONTRIBUTE_LINKS, SITE } from '@/data/content'

export function ContributeSection() {
  const t = useTranslations('contribute')

  return (
    <Section id="contribute">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-surface-container to-surface-container-low p-6 sm:p-8 md:p-16 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-primary-container) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden
        />

        <div className="relative z-10 grid gap-10 lg:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader title={t('title')} description={t('description')} />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={SITE.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="size-4" aria-hidden stroke={1.75} />
                  {t('viewRepo')}
                </a>
              </Button>
              <Button variant="secondary" asChild className="w-full sm:w-auto">
                <a
                  href={SITE.discussionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconMessageCircle aria-hidden stroke={1.75} />
                  {t('discussions')}
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CONTRIBUTE_KEYS.map((key) => (
              <Card key={key} className="h-full">
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-headline-md">
                    {t(`items.${key}.title`)}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {t(`items.${key}.description`)}
                  </CardDescription>
                  <a
                    href={CONTRIBUTE_LINKS[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-label-md text-primary hover:underline cursor-pointer"
                  >
                    {t(`items.${key}.label`)}
                    <IconExternalLink className="size-3.5" aria-hidden stroke={1.75} />
                  </a>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
