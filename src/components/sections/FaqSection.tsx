import { useTranslations } from 'next-intl'

import { Section, SectionHeader } from '@/components/layout/Section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_KEYS } from '@/data/content'

export function FaqSection() {
  const t = useTranslations('faq')

  return (
    <Section id="faq">
      <SectionHeader
        title={t('title')}
        description={t('description')}
        centered
      />

      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {FAQ_KEYS.map((key) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{t(`items.${key}.q`)}</AccordionTrigger>
            <AccordionContent>{t(`items.${key}.a`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
