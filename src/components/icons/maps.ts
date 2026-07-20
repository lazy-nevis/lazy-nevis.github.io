import type { TablerIcon } from '@tabler/icons-react'
import {
  IconBell,
  IconBrandApple,
  IconBrandWindows,
  IconChecklist,
  IconCoffee,
  IconDatabase,
  IconHistory,
  IconLayoutSidebar,
  IconLock,
  IconSettings,
  IconShield,
  IconStopwatch,
  IconTarget,
  IconVolume,
  IconWifiOff,
} from '@tabler/icons-react'
import type { ComponentType, SVGProps } from 'react'

import { IconBrandLinux } from '@/components/icons/IconBrandLinux'
import type { InstallPlatform } from '@/data/content'

type PlatformIcon = TablerIcon | ComponentType<SVGProps<SVGSVGElement>>

export const FEATURE_ICON_MAP: Record<string, TablerIcon> = {
  Timer: IconStopwatch,
  Target: IconTarget,
  Bell: IconBell,
  Volume2: IconVolume,
  Coffee: IconCoffee,
  Checklist: IconChecklist,
  History: IconHistory,
  Layout: IconLayoutSidebar,
  Settings: IconSettings,
  Shield: IconShield,
}

export const PILLAR_ICONS = [IconDatabase, IconLock, IconWifiOff] as const

export const PLATFORM_TAB_ICONS: Record<InstallPlatform, PlatformIcon> = {
  macos: IconBrandApple,
  windows: IconBrandWindows,
  linux: IconBrandLinux,
}
