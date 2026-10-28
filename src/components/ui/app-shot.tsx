import { getScreenshot, screenshotSrc } from '@/data/content'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

type AppShotProps = {
  id: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

/** App screenshot that follows the site theme (light/dark variant). */
export function AppShot({ id, alt, className, priority, sizes }: AppShotProps) {
  const { theme } = useTheme()
  const shot = getScreenshot(id)

  return (
    <img
      src={screenshotSrc(shot, theme)}
      alt={alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('h-auto w-full', className)}
    />
  )
}
