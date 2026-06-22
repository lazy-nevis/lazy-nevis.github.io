import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative z-10 py-section', className)}>
      <div className={cn('mx-auto max-w-7xl px-container', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
  applyMarginBottom?: boolean;
};

export function SectionHeader({
  title,
  description,
  className,
  applyMarginBottom = true,
  centered = false,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        applyMarginBottom && 'mb-8 sm:mb-12 md:mb-16',
        centered && 'text-center',
        className,
      )}
    >
      <h2
        className={cn(
          'text-headline-lg text-foreground section-heading-accent',
          centered && 'mx-auto after:left-1/2 after:-translate-x-1/2 after:w-3/4 sm:after:w-full sm:after:left-0 sm:after:translate-x-0',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-body-lg text-muted-foreground',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
