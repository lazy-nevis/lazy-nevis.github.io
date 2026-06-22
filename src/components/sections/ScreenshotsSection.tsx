import { useTranslations } from 'next-intl'
import { useCallback, useRef } from 'react'
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import {
  IconChevronLeft,
  IconChevronRight,
} from '@/components/icons'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import { SCREENSHOTS } from '@/data/content'
import { useReducedMotion } from '@/hooks/use-ui'
import { cn } from '@/lib/utils'

export function ScreenshotsSection() {
  const t = useTranslations('screenshots')
  const reducedMotion = useReducedMotion()
  const swiperRef = useRef<SwiperType | null>(null)
  const lightboxRef = useRef<import('photoswipe').default | null>(null)

  const openLightbox = useCallback(
    async (index: number) => {
      const PhotoSwipe = (await import('photoswipe')).default
      await import('photoswipe/style.css')

      if (lightboxRef.current) {
        lightboxRef.current.destroy()
      }

      const items = SCREENSHOTS.map((shot) => ({
        src: shot.src,
        width: shot.width,
        height: shot.height,
        alt: t(`items.${shot.id}.alt`),
      }))

      const pswp = new PhotoSwipe({
        dataSource: items,
        index,
        bgOpacity: 0.92,
        padding: { top: 20, bottom: 40, left: 12, right: 12 },
        showHideAnimationType: reducedMotion ? 'none' : 'zoom',
        mainClass: 'pswp--lazynevis',
      })

      pswp.addFilter('useContentPlaceholder', () => false)

      lightboxRef.current = pswp
      pswp.init()
    },
    [reducedMotion, t],
  )

  return (
    <Section id="screenshots" containerClassName="!max-w-[100vw] overflow-hidden">
      <div className="px-container max-w-7xl mx-auto">
        <SectionHeader title={t('title')} description={t('description')} />

        <div className="mb-4 flex justify-center gap-2 sm:mb-6 sm:justify-end">
          <Button
            variant="secondary"
            size="icon"
            aria-label={t('prev')}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IconChevronLeft className="size-5" aria-hidden />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label={t('next')}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IconChevronRight className="size-5" aria-hidden />
          </Button>
        </div>
      </div>

      <Swiper
        className="screenshots-coverflow px-container !overflow-visible !pb-4"
        modules={[EffectCoverflow, Autoplay, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 18,
          stretch: 0,
          depth: 120,
          modifier: 1.15,
          slideShadows: false,
        }}
        autoplay={
          reducedMotion
            ? false
            : {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 24,
            coverflowEffect: {
              rotate: 24,
              depth: 160,
              modifier: 1.2,
            },
          },
        }}
      >
        {SCREENSHOTS.map((shot, index) => {
          const caption = t(`items.${shot.id}.caption`)
          return (
            <SwiperSlide key={shot.id}>
              <button
                type="button"
                className={cn(
                  'group relative block w-full cursor-pointer text-left',
                  'transition-transform duration-300 motion-safe:hover:scale-[1.02]',
                )}
                onClick={() => void openLightbox(index)}
                aria-label={t('openFullscreen', { caption })}
              >
                <img
                  src={shot.src}
                  alt={t(`items.${shot.id}.alt`)}
                  className="h-auto w-full rounded-2xl object-contain"
                  loading="lazy"
                  width={shot.width}
                  height={shot.height}
                />
                <p className="mt-2 px-1 text-center text-sm font-semibold text-foreground sm:text-base line-clamp-2">
                  {caption}
                </p>
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Section>
  )
}
