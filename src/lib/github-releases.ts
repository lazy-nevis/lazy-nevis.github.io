import { SITE } from '@/data/content'

export type GitHubRelease = {
  tag_name: string
  name: string
  prerelease: boolean
  draft: boolean
  published_at: string
  html_url: string
}

export type ReleaseChannels = {
  latest: GitHubRelease | null
  stable: GitHubRelease | null
  prerelease: GitHubRelease | null
}

const RELEASES_API = `${SITE.repoUrl.replace('github.com', 'api.github.com/repos')}/releases`

export async function fetchReleaseChannels(): Promise<ReleaseChannels> {
  const response = await fetch(RELEASES_API, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const releases = (await response.json()) as GitHubRelease[]
  const published = releases.filter((r) => !r.draft)

  return {
    latest: published[0] ?? null,
    stable: published.find((r) => !r.prerelease) ?? null,
    prerelease: published.find((r) => r.prerelease) ?? null,
  }
}
