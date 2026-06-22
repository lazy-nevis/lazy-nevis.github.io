import { useEffect, useState } from 'react'

import {
  fetchReleaseChannels,
  type ReleaseChannels,
} from '@/lib/github-releases'

type UseGitHubReleasesResult = {
  releases: ReleaseChannels | null
  loading: boolean
  error: string | null
}

export function useGitHubReleases(): UseGitHubReleasesResult {
  const [releases, setReleases] = useState<ReleaseChannels | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchReleaseChannels()
      .then((data) => {
        if (!cancelled) {
          setReleases(data)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load releases')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { releases, loading, error }
}
