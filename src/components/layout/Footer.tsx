import { useTranslations } from 'next-intl';

import {
  IconBrandGithub,
  IconCoffee,
  IconMessageCircle,
} from '@/components/icons';
import { SITE } from '@/data/content';

import logo from '@/assets/brand/logo-header.webp';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-surface-container-lowest py-section">
      <div className="mx-auto max-w-7xl px-container">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <img src={logo} alt={SITE.name} className="h-9 w-auto sm:h-10" />
            </div>
            <p className="text-body-md text-muted-foreground">{t('tagline')}</p>
            <a
              href={SITE.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-md text-primary hover:underline cursor-pointer"
            >
              {t('mitLicense')}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-label-md text-foreground">{t('links')}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={SITE.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="GitHub repository"
              >
                <IconBrandGithub className="size-4" aria-hidden stroke={1.75} />
                GitHub
              </a>
              <a
                href={SITE.discussionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <IconMessageCircle className="size-4" aria-hidden stroke={1.75} />
                Discussions
              </a>
              <a
                href={SITE.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {t('privacy')}
              </a>
              <a
                href={SITE.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {SITE.portfolioName}
              </a>
            </div>
          </div>

          <div>
            <a
              href={SITE.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 sm:px-6 sm:py-3 text-label-md text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              <IconCoffee className="size-4 text-warning" aria-hidden stroke={1.75} />
              {t('buyCoffee')}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-label-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {year}{' '}
            <a
              href={SITE.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline cursor-pointer"
            >
              {SITE.authorName}
            </a>
            {' · '}
            <a
              href={SITE.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline cursor-pointer"
            >
              {SITE.portfolioName}
            </a>
            . {t('copyright')}
          </p>
          <p>
            {t('landingAt')}{' '}
            <a
              href={SITE.url}
              className="text-primary hover:underline cursor-pointer"
            >
              {new URL(SITE.url).host}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
