import { useTranslations } from 'next-intl';

import { PILLAR_ICONS } from '@/components/icons';
import { Section, SectionHeader } from '@/components/layout/Section';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PILLAR_KEYS } from '@/data/content';
import { cn } from '@/lib/utils';

export function AboutSection() {
  const t = useTranslations('about');

  const richTags = {
    focused: (chunks: React.ReactNode) => (
      <strong className="text-foreground">{chunks}</strong>
    ),
    distracted: (chunks: React.ReactNode) => (
      <strong className="text-foreground">{chunks}</strong>
    ),
    idle: (chunks: React.ReactNode) => (
      <strong className="text-foreground">{chunks}</strong>
    ),
    bold: (chunks: React.ReactNode) => (
      <strong className="text-foreground">{chunks}</strong>
    ),
  };

  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6 text-body-lg text-muted-foreground">
          <SectionHeader
            title={t('title')}
            description={t('description')}
            applyMarginBottom={false}
          />
          <p>{t.rich('p1', richTags)}</p>
          <p>{t.rich('p2', richTags)}</p>
          <p>{t('p3')}</p>
        </div>

        <div className="grid gap-4">
          {PILLAR_KEYS.map((key, i) => {
            const Icon = PILLAR_ICONS[i] ?? PILLAR_ICONS[0];
            return (
              <Card
                key={key}
                className="transition-colors duration-200 hover:border-primary-container/30 cursor-default"
              >
                <CardHeader className="flex-row items-start gap-4 space-y-0 p-5 sm:p-6">
                  <div
                    className={cn(
                      'flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl',
                      'bg-primary-container/15 text-primary-container',
                    )}
                  >
                    <Icon className="size-6" aria-hidden stroke={1.75} />
                  </div>
                  <div>
                    <CardTitle className="text-headline-md mb-2">
                      {t(`pillars.${key}.title`)}
                    </CardTitle>
                    <CardDescription>
                      {t(`pillars.${key}.description`)}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
