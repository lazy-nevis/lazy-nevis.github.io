import { useTranslations } from 'next-intl'
import { useState } from 'react'

import type { TablerIcon } from '@tabler/icons-react'

import {
  IconAlertTriangle,
  IconExternalLink,
  PLATFORM_TAB_ICONS,
} from '@/components/icons'
import { Section, SectionHeader } from '@/components/layout/Section'
import {
  BashCommandLine,
  PowerShellCommandLine,
  TerminalComment,
  TerminalWindow,
} from '@/components/ui/terminal-window'
import {
  INSTALL_GUIDES,
  INSTALL_PLATFORMS,
  INSTALL_TROUBLESHOOT,
  SITE,
  type InstallPlatform,
} from '@/data/content'
import { useGitHubReleases } from '@/hooks/use-github-releases'
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
  const [copied, setCopied] = useState<string | null>(null)

  const hasStable = Boolean(releases?.stable)
  const hasPrerelease = Boolean(releases?.prerelease)
  const hasInstallCommands = hasStable || hasPrerelease

  const stableCmd = t(`commands.${active}Stable`)
  const prereleaseCmd = t(`commands.${active}Prerelease`)

  const copyCommand = async (cmd: string, id: string) => {
    await navigator.clipboard.writeText(cmd)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const stableComment = releases?.stable
    ? t('terminalStableComment', { version: releases.stable.tag_name })
    : t('terminalStableCommentGeneric')

  const prereleaseComment = releases?.prerelease
    ? t('terminalPrereleaseComment', { version: releases.prerelease.tag_name })
    : t('terminalPrereleaseCommentGeneric')

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

      <div className="mx-auto max-w-4xl space-y-6">
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
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5',
              )}
            >
              <PlatformTabIcon id={platform} />
              <span className="truncate">{t(`tabs.${platform}`)}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4" role="tabpanel">
          <p className="text-center text-body-md text-muted-foreground px-1">
            {t(`requirements.${active}`)}
          </p>

          {active === 'linux' ? (
            <TerminalWindow variant="linux" title={t('terminalTitle.linux')}>
              <p className="text-[#9cdcfe]">
                <span className="text-[#4ec9b0]">lazynevis@linux</span>
                <span className="text-foreground">:~$ </span>
                <span className="text-foreground">{t('linuxDepsCmd')}</span>
              </p>
              <TerminalComment>{t('linuxDeps')}</TerminalComment>
            </TerminalWindow>
          ) : null}

          {!loading && !hasInstallCommands ? (
            <p className="rounded-xl border border-border bg-card/40 px-4 py-6 text-center text-body-md text-muted-foreground">
              {t('noReleases')}
            </p>
          ) : null}

          {hasStable ? (
            <div className="space-y-2">
              <p className="text-label-md font-semibold text-foreground px-1">
                {t('stableLabel')}
                {releases?.stable
                  ? ` · ${releases.stable.tag_name}`
                  : ''}{' '}
                · {t(`shellLabel.${active}`)}
              </p>
              <InstallCommandBlock
                platform={active}
                command={stableCmd}
                copied={copied === 'stable'}
                onCopy={() => void copyCommand(stableCmd, 'stable')}
                copyLabel={t('stableLabel')}
                comment={stableComment}
                readyComment={t('terminalReadyComment')}
              />
            </div>
          ) : null}

          {hasPrerelease ? (
            <div className="space-y-2">
              <p className="text-label-md text-muted-foreground px-1">
                {t('prereleaseLabel')}
                {releases?.prerelease
                  ? ` · ${releases.prerelease.tag_name}`
                  : ''}
              </p>
              <p className="text-label-sm text-muted-foreground px-1">
                {t('prereleaseNote')}
              </p>
              <InstallCommandBlock
                platform={active}
                command={prereleaseCmd}
                copied={copied === 'prerelease'}
                onCopy={() => void copyCommand(prereleaseCmd, 'prerelease')}
                copyLabel={t('prereleaseLabel')}
                comment={prereleaseComment}
                readyComment={t('terminalReadyComment')}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap justify-center gap-4 pt-2">
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

      <aside
        className="mx-auto mt-8 flex max-w-3xl gap-4 rounded-xl border border-warning/30 bg-warning/10 p-4 sm:p-6"
        role="note"
      >
        <IconAlertTriangle
          className="size-6 shrink-0 text-warning"
          aria-hidden
          stroke={1.75}
        />
        <div className="space-y-2 text-body-md min-w-0">
          <p className="font-semibold text-foreground">{t('warningTitle')}</p>
          <p className="text-muted-foreground">{t('warningBody')}</p>
          <p className="flex flex-wrap gap-3 sm:gap-4 text-label-md">
            <a
              href={INSTALL_TROUBLESHOOT.macos.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline cursor-pointer"
            >
              {t('gatekeeper')}
            </a>
            <a
              href={INSTALL_TROUBLESHOOT.windows.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline cursor-pointer"
            >
              {t('smartscreen')}
            </a>
            <a
              href={INSTALL_TROUBLESHOOT.linux.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline cursor-pointer"
            >
              {t('linuxLibs')}
            </a>
          </p>
        </div>
      </aside>
    </Section>
  )
}
