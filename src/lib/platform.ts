export type Platform = 'macos' | 'windows' | 'linux' | 'unknown'

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown'

  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() ?? ''

  if (ua.includes('win') || platform.includes('win')) return 'windows'
  if (ua.includes('mac') || platform.includes('mac')) return 'macos'
  if (ua.includes('linux') || platform.includes('linux')) return 'linux'

  return 'unknown'
}
