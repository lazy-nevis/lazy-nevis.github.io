import { IconCheck, IconCopy } from '@/components/icons'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import type { InstallPlatform } from '@/data/content'
import { cn } from '@/lib/utils'

export type TerminalVariant = InstallPlatform

type TerminalWindowProps = {
  variant: TerminalVariant
  title: string
  children: ReactNode
  copyText?: string
  onCopy?: () => void
  copied?: boolean
  copyLabel?: string
  className?: string
}

function TrafficLights() {
  return (
    <>
      <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
      <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
      <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
    </>
  )
}

function WindowsControls() {
  return (
    <div className="flex items-center gap-3 text-sm leading-none text-white/80">
      <span aria-hidden>—</span>
      <span aria-hidden>□</span>
      <span className="text-white/90" aria-hidden>
        ✕
      </span>
    </div>
  )
}

function TerminalChrome({
  variant,
  title,
}: {
  variant: TerminalVariant
  title: string
}) {
  if (variant === 'windows') {
    return (
      <div className="flex items-center justify-between border-b border-white/10 bg-[#012456] px-4 py-2.5">
        <span className="font-mono text-sm text-white/95">{title}</span>
        <WindowsControls />
      </div>
    )
  }

  if (variant === 'linux') {
    return (
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e1e] px-4 py-2.5">
        <TrafficLights />
        <span className="ml-2 flex-1 text-center font-mono text-label-sm text-[#9cdcfe]">
          {title}
        </span>
        <span className="size-3 opacity-0" aria-hidden />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 border-b border-border bg-surface-container-high px-4 py-3">
      <TrafficLights />
      <span className="ml-2 font-mono text-label-sm text-muted-foreground">
        {title}
      </span>
    </div>
  )
}

export function TerminalWindow({
  variant,
  title,
  children,
  copyText,
  onCopy,
  copied = false,
  copyLabel,
  className,
}: TerminalWindowProps) {
  const tc = useTranslations('common')

  const bodyBg =
    variant === 'windows'
      ? 'bg-[#0c0c0c]'
      : variant === 'linux'
        ? 'bg-[#0d1117]'
        : 'bg-[#0b0f10]'

  return (
    <div
      className={cn(
        'glass-panel overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      <TerminalChrome variant={variant} title={title} />
      <div
        className={cn(
          'relative p-4 font-mono text-xs sm:p-6 sm:text-sm md:p-8 md:text-base',
          bodyBg,
        )}
      >
        {children}
        {copyText && onCopy ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              'absolute right-4 top-4 size-9 text-muted-foreground hover:text-primary',
              variant === 'windows' && 'text-white/50 hover:text-white',
            )}
            onClick={onCopy}
            aria-label={`${copied ? tc('copied') : tc('copy')}${copyLabel ? ` ${copyLabel}` : ''}`}
          >
            {copied ? (
              <IconCheck className="size-4 text-success" aria-hidden stroke={1.75} />
            ) : (
              <IconCopy className="size-4" aria-hidden stroke={1.75} />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export function BashCommandLine({ command }: { command: string }) {
  const parts = command.split(/(\s+)/)
  return (
    <p className="leading-relaxed break-all">
      {parts.map((part, i) => {
        if (part === 'bash' || part === 'curl' || part === '-fL') {
          return (
            <span key={i} className="text-primary">
              {part}
            </span>
          )
        }
        if (part === '--prerelease') {
          return (
            <span key={i} className="text-tertiary">
              {part}
            </span>
          )
        }
        if (part.includes('install.sh')) {
          return (
            <span key={i} className="text-secondary">
              {part}
            </span>
          )
        }
        return (
          <span key={i} className="text-foreground">
            {part}
          </span>
        )
      })}
    </p>
  )
}

export function PowerShellCommandLine({ command }: { command: string }) {
  return (
    <p className="leading-relaxed break-all text-[#cccccc]">
      <span className="text-[#c586c0]">& </span>
      <span className="text-[#dcdcaa]">(</span>
      <span className="text-[#dcdcaa]">[scriptblock]</span>
      <span className="text-[#dcdcaa]">::Create(</span>
      <span className="text-[#dcdcaa]">(</span>
      <span className="text-[#569cd6]">iwr </span>
      <span className="text-[#ce9178]">
        &apos;https://raw.githubusercontent.com/lazy-nevis/lazy-nevis/refs/heads/main/scripts/install.ps1&apos;
      </span>
      <span className="text-[#569cd6]"> -UseBasicParsing</span>
      <span className="text-[#dcdcaa]">).Content))</span>
      {command.includes('-Prerelease') ? (
        <span className="text-[#9cdcfe]"> -Prerelease</span>
      ) : null}
    </p>
  )
}

export function TerminalComment({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-muted-foreground">{children}</p>
}
