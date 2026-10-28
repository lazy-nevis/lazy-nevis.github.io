import { useTranslations } from 'next-intl'
import { useState } from 'react'

import type { TablerIcon } from '@tabler/icons-react'

import {
  IconDownload,
  IconExternalLink,
  PLATFORM_TAB_ICONS,
} from '@/components/icons'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'
import {
  BashCommandLine,
  PowerShellCommandLine,
  TerminalComment,
  TerminalWindow,
} from '@/components/ui/terminal-window'
import {
  getInstallCommand,
  INSTALL_GUIDES,
  INSTALL_PLATFORMS,
  INSTALL_TROUBLESHOOT,
  SITE,
  type InstallChannel,
  type InstallPlatform,
} from '@/data/content'
import { useGitHubReleases } from '@/hooks/use-github-releases'
import { downloadInstallHelper } from '@/lib/install-helpers'
import { detectPlatform, type Platform } from '@/lib/platform'
import { cn } from '@/lib/utils'

function mapDetectedPlatform(platform: Platform): InstallPlatform {
  if (platform === 'macos') return 'macos'
  if (platform === 'windows') return 'windows'
  if (platform === 'linux') return 'linux'
  return 'macos'
}

function PlatformTabIcon({ id }: { id: InstallPlatform }) {
  const Icon = PLATFORM_TAB_ICONS[id]
  if (id === 'linux') {
    return <Icon className="size-4 shrink-0" aria-hidden />
  }
  const TablerIconComponent = Icon as TablerIcon
  return (
    <TablerIconComponent
      className="size-4 shrink-0"
      aria-hidden
      stroke={1.75}
    />
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <span
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-full',
        'bg-primary-container text-primary-foreground text-label-sm font-bold',
      )}
      aria-hidden
    >
      {n}
    </span>
  )
}

function InstallCommandBlock({
  platform,
  command,
  copied,
  onCopy,
  copyLabel,
  comment,
  readyComment,
}: {
  platform: InstallPlatform
  command: string
  copied: boolean
  onCopy: () => void
  copyLabel: string
  comment: string
  readyComment: string
}) {
  const t = useTranslations('install')
  const title = t(`terminalTitle.${platform}`)

  return (
    <TerminalWindow
      variant={platform}
      title={title}
      copyText={command}
      onCopy={onCopy}
      copied={copied}
      copyLabel={copyLabel}
    >
      {platform === 'windows' ? (
        <PowerShellCommandLine command={command} />
      ) : (
        <BashCommandLine command={command} />
      )}
      <TerminalComment>{comment}</TerminalComment>
      <TerminalComment>{readyComment}</TerminalComment>
    </TerminalWindow>
  )
}

export function InstallSection() {
  const t = useTranslations('install')
  const { releases, loading, error } = useGitHubReleases()
  const [active, setActive] = useState<InstallPlatform>(() =>
    mapDetectedPlatform(detectPlatform()),
  )
  const [channel, setChannel] = useState<InstallChannel>('stable')
  const [copied, setCopied] = useState<string | null>(null)
  const [downloadHint, setDownloadHint] = useState(false)

  const hasStable = Boolean(releases?.stable)
  const hasPrerelease = Boolean(releases?.prerelease)
  const effectiveChannel: InstallChannel =
    channel === 'prerelease' && !hasPrerelease && hasStable
      ? 'stable'
      : channel === 'stable' && !hasStable && hasPrerelease
        ? 'prerelease'
        : channel

  const command = getInstallCommand(active, effectiveChannel)
  const troubleshoot = INSTALL_TROUBLESHOOT[active]

  const copyText = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = () => {
    downloadInstallHelper(active, effectiveChannel)
    setDownloadHint(true)
    setTimeout(() => setDownloadHint(false), 4000)
  }

  const terminalComment =
    effectiveChannel === 'prerelease'
      ? releases?.prerelease
        ? t('terminalPrereleaseComment', {
            version: releases.prerelease.tag_name,
          })
        : t('terminalPrereleaseCommentGeneric')
      : releases?.stable
        ? t('terminalStableComment', { version: releases.stable.tag_name })
        : t('terminalStableCommentGeneric')

  const stepKeys = ['1', '2', '2Blocked', '3', '4'] as const

  return (
    <Section id="install">
      <SectionHeader
        title={t('title')}
        description={t('description')}
        centered
      />

      <p className="mb-4 text-center text-label-sm text-muted-foreground">
        {t('detectedHint')}
      </p>

      {loading ? (
        <p className="mb-6 text-center text-body-md text-muted-foreground">
          {t('loadingReleases')}
        </p>
      ) : null}

      {!loading && error ? (
        <p className="mb-6 text-center text-body-md text-muted-foreground">
          {t('releasesError')}
        </p>
      ) : null}

      {!loading && releases?.latest ? (
        <div className="mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-center">
          <span className="rounded-full border border-border bg-card/50 px-3 py-1 text-label-sm text-foreground">
            {t('latestVersion', { version: releases.latest.tag_name })}
          </span>
          {releases.stable ? (
            <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-label-sm text-success">
              {t('stableVersion', { version: releases.stable.tag_name })}
            </span>
          ) : null}
          {releases.prerelease ? (
            <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-label-sm text-warning">
              {t('prereleaseVersion', { version: releases.prerelease.tag_name })}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="mx-auto max-w-4xl space-y-8">
        <div
          className="flex rounded-2xl border border-border bg-card/40 p-1"
          role="tablist"
          aria-label={t('title')}
        >
          {INSTALL_PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              role="tab"
              aria-selected={active === platform}
              onClick={() => setActive(platform)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-label-sm sm:px-4 sm:text-label-md transition-colors cursor-pointer min-w-0',
                active === platform
                  ? 'bg-primary-container/15 text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
              )}
            >
              <PlatformTabIcon id={platform} />
              <span className="truncate">{t(`tabs.${platform}`)}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6" role="tabpanel">
          <p className="text-center text-body-md text-muted-foreground px-1">
            {t(`requirements.${active}`)}
          </p>

          {active === 'linux' ? (
            <p className="text-center text-body-md text-muted-foreground px-2">
              {t('linuxHelperNote')}
            </p>
          ) : null}

          <div className="space-y-3">
            <p className="text-center text-label-md font-semibold text-foreground">
              {t('channel.label')}
            </p>
            <div
              className="mx-auto flex max-w-md rounded-2xl border border-border bg-card/40 p-1"
              role="group"
              aria-label={t('channel.label')}
            >
              <button
                type="button"
                onClick={() => setChannel('stable')}
                disabled={!hasStable && !loading}
                className={cn(
                  'flex-1 rounded-xl px-3 py-2.5 text-label-md transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
                  effectiveChannel === 'stable'
                    ? 'bg-primary-container/15 text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                )}
              >
                {t('channel.stable')}
                {releases?.stable ? ` · ${releases.stable.tag_name}` : ''}
              </button>
              <button
                type="button"
                onClick={() => setChannel('prerelease')}
                disabled={!hasPrerelease && !loading}
                className={cn(
                  'flex-1 rounded-xl px-3 py-2.5 text-label-md transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
                  effectiveChannel === 'prerelease'
                    ? 'bg-primary-container/15 text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                )}
              >
                {t('channel.prerelease')}
                {releases?.prerelease
                  ? ` · ${releases.prerelease.tag_name}`
                  : ''}
              </button>
            </div>
            {effectiveChannel === 'prerelease' ? (
              <p className="text-center text-label-sm text-warning px-2">
                {t('channel.prereleaseHint')}
              </p>
            ) : null}
          </div>

          {!loading && !hasStable && !hasPrerelease ? (
            <p className="rounded-xl border border-border bg-card/40 px-4 py-6 text-center text-body-md text-muted-foreground">
              {t('noReleases')}
            </p>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Button
                type="button"
                size="lg"
                onClick={handleDownload}
                className="min-w-[14rem]"
              >
                <IconDownload aria-hidden stroke={1.75} />
                {t('downloadHelper')}
              </Button>
              {downloadHint ? (
                <p className="text-center text-label-sm text-success" role="status">
                  {t('downloadStarted')}
                </p>
              ) : null}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-center text-headline-md text-foreground">
              {t('steps.heading')}
            </h3>
            <ol className="mx-auto max-w-2xl space-y-4">
              {stepKeys.map((key, index) => {
                const text = t(`steps.${active}.${key}`)
                const showTroubleshootLink = key === '3'
                return (
                  <li key={key} className="flex gap-3 sm:gap-4">
                    <StepNumber n={index + 1} />
                    <div className="min-w-0 space-y-1 pt-0.5">
                      <p className="text-body-md text-foreground leading-relaxed">
                        {text}
                      </p>
                      {showTroubleshootLink ? (
                        <a
                          href={troubleshoot.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-label-md text-primary hover:underline cursor-pointer"
                        >
                          {t(troubleshoot.labelKey)}
                          <IconExternalLink
                            className="size-3.5"
                            aria-hidden
                            stroke={1.75}
                          />
                        </a>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <details className="group rounded-2xl border border-border bg-card/30 open:bg-card/40">
            <summary className="cursor-pointer list-none px-4 py-3 sm:px-5 sm:py-4 text-label-md font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
              <span>{t('advancedCopy')}</span>
              <span
                className="text-muted-foreground text-label-sm font-normal group-open:hidden"
                aria-hidden
              >
                +
              </span>
              <span
                className="text-muted-foreground text-label-sm font-normal hidden group-open:inline"
                aria-hidden
              >
                −
              </span>
            </summary>
            <div className="space-y-3 border-t border-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              <p className="text-body-md text-muted-foreground">
                {t('advancedHint', { shell: t(`shellLabel.${active}`) })}
              </p>
              <InstallCommandBlock
                platform={active}
                command={command}
                copied={copied === 'advanced'}
                onCopy={() => void copyText(command, 'advanced')}
                copyLabel={
                  effectiveChannel === 'prerelease'
                    ? t('prereleaseLabel')
                    : t('stableLabel')
                }
                comment={terminalComment}
                readyComment={t('terminalReadyComment')}
              />
            </div>
          </details>

          <div className="flex flex-wrap justify-center gap-4 pt-1">
            <a
              href={INSTALL_GUIDES[active]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-label-md text-primary hover:underline cursor-pointer"
            >
              {t('fullGuide')}
              <IconExternalLink className="size-3.5" aria-hidden stroke={1.75} />
            </a>
            <a
              href={SITE.releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-label-md text-primary hover:underline cursor-pointer"
            >
              {t('releasesLink')}
              <IconExternalLink className="size-3.5" aria-hidden stroke={1.75} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
