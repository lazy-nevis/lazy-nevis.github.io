import { IconBrandGithub, IconDownload } from '@/components/icons';
import { HexPulseCanvas } from '@/components/hero/HexPulseCanvas';
import { Button } from '@/components/ui/button';
import { SITE } from '@/data/content';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

import appIcon from '@/assets/brand/app-icon.webp';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden pt-16 md:pt-[4.5rem]"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <HexPulseCanvas className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-container py-10 md:grid-cols-2 md:gap-8 md:py-14 lg:grid-cols-3 lg:items-center lg:py-16">
        <div className="order-2 space-y-4 text-center sm:space-y-5 md:order-1 md:text-left lg:col-span-2">
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <p className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1 text-label-sm text-primary backdrop-blur-sm">
              {t('badge')}
            </p>
            <p className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1 text-label-sm text-primary backdrop-blur-sm">
              {t('subBadge')}
            </p>
          </div>

          <h1 id="hero-heading" className="text-display text-foreground">
            <p>{t('title')}</p>
            <p>{t('subTitle')}</p>
            <span className="text-gradient">{t('titleAccent')}</span>
          </h1>

          <p className="max-w-lg text-body-lg text-muted-foreground">
            {t('description')}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
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

          <p className="text-label-sm text-muted-foreground">{t('tagline')}</p>
        </div>

        <div className="relative order-1 flex justify-center md:order-2 lg:justify-end">
          <div
            className="absolute h-64 w-64 rounded-full bg-primary-container/20 blur-[100px]"
            aria-hidden
          />
          <img
            src={appIcon}
            alt={t('iconAlt')}
            className={cn(
              'relative z-10 w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain',
              'drop-shadow-[0_0_30px_rgb(214_48_49/0.3)]',
              'motion-safe:animate-float',
            )}
            width={512}
            height={512}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
