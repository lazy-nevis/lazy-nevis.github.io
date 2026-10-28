import logoOnDark from '@/assets/brand/logo-on-dark.webp'
import logoOnLight from '@/assets/brand/logo-on-light.webp'
import { SITE } from '@/data/content'
import { useTheme } from '@/hooks/use-theme'

export function BrandLogo({ className, decorative = true }: { className?: string; decorative?: boolean }) {
  const { theme } = useTheme()
  return (
    <img
      src={theme === 'dark' ? logoOnDark : logoOnLight}
      alt={decorative ? '' : SITE.name}
      width={540}
      height={200}
      className={className}
    />
  )
}
