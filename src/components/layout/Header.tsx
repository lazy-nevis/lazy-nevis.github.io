import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  IconBrandGithub,
  IconDownload,
  IconMenu2,
} from '@/components/icons';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_HREFS, SITE } from '@/data/content';
import { useScrolled } from '@/hooks/use-ui';
import { cn } from '@/lib/utils';

import logo from '@/assets/brand/logo-header.webp';

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const navLink = (href: string, label: string) => (
    <a
      key={href}
      href={href}
      className="text-label-md text-muted-foreground transition-colors duration-200 hover:text-foreground rounded-lg px-3 py-2 hover:bg-white/5 cursor-pointer"
      onClick={() => setOpen(false)}
    >
      {label}
    </a>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/60 backdrop-blur-[20px] border-b border-border shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 md:h-[4.5rem] max-w-7xl items-center justify-between px-container gap-3">
        <a
          href="#"
          className="flex items-center gap-3 cursor-pointer shrink-0 min-w-0"
          aria-label={tc('home')}
        >
          <img src={logo} alt="" className="h-9 w-auto sm:h-10 md:h-11" />
        </a>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label={tc('mainNav')}
        >
          {NAV_HREFS.map((item) => navLink(item.href, t(item.key)))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitcher className="hidden sm:flex" />

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#install">
              <IconDownload aria-hidden stroke={1.75} />
              {tc('download')}
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="lg:hidden"
                aria-label={tc('openMenu')}
              >
                <IconMenu2 aria-hidden stroke={1.75} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{SITE.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <LanguageSwitcher />
              </div>
              <nav
                className="mt-6 flex flex-col gap-1"
                aria-label={tc('mobileNav')}
              >
                {NAV_HREFS.map((item) => navLink(item.href, t(item.key)))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild>
                  <a href="#install">
                    <IconDownload aria-hidden stroke={1.75} />
                    {tc('download')}
                  </a>
                </Button>
                <Button variant="secondary" asChild>
                  <a
                    href={SITE.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithub className="size-4" aria-hidden stroke={1.75} />
                    {tc('github')}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
