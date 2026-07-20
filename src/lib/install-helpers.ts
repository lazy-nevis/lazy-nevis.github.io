import {
  getInstallCommand,
  INSTALL_SCRIPT_URLS,
  type InstallChannel,
  type InstallPlatform,
} from '@/data/content'

export type InstallHelperFile = {
  filename: string
  mime: string
  content: string
}

function macosHelperBody(channel: InstallChannel): string {
  const flag = channel === 'prerelease' ? ' --prerelease' : ''
  return `#!/bin/bash
set -euo pipefail

echo "LazyNevis installer"
echo "Downloading and running the official install script…"
echo

bash <(curl -fL "${INSTALL_SCRIPT_URLS.sh}")${flag}

echo
echo "Done. You can close this window."
read -r -p "Press Enter to close…"
`
}

/**
 * Linux helper: detect distro family, install runtime libs, then run install.sh.
 * Package sets match docs/install/linux.md in the app repo.
 *
 * Note: shell `\${VAR}` / `\$var` escapes are for the TypeScript template literal
 * so the downloaded script still contains real shell expansions.
 */
function linuxHelperBody(channel: InstallChannel): string {
  const flag = channel === 'prerelease' ? ' --prerelease' : ''
  const scriptUrl = INSTALL_SCRIPT_URLS.sh

  return `#!/bin/bash
set -euo pipefail

echo "LazyNevis installer (Linux)"
echo

if [[ "$(uname -m)" != "x86_64" && "$(uname -m)" != "amd64" ]]; then
  echo "Error: LazyNevis on Linux currently supports x64 (amd64) only."
  echo "Detected: $(uname -m)"
  read -r -p "Press Enter to close…"
  exit 1
fi

detect_family() {
  local id="" like=""
  if [[ -r /etc/os-release ]]; then
    # shellcheck disable=SC1091
    . /etc/os-release
    id="\${ID:-}"
    like="\${ID_LIKE:-}"
  fi
  id="$(printf '%s' "$id" | tr '[:upper:]' '[:lower:]')"
  like="$(printf '%s' "$like" | tr '[:upper:]' '[:lower:]')"

  case "$id" in
    ubuntu|debian|linuxmint|pop|elementary|zorin|neon|kubuntu|xubuntu|lubuntu|raspbian|kali|parrot|mx|devuan)
      echo debian
      return
      ;;
    fedora|rhel|centos|rocky|almalinux|ol|oracle|nobara)
      echo rhel
      return
      ;;
    arch|manjaro|endeavouros|garuda|artix|cachyos|archcraft)
      echo arch
      return
      ;;
    opensuse*|sles|sled)
      echo suse
      return
      ;;
  esac

  case " $like " in
    *" debian "*|*" ubuntu "*)
      echo debian
      return
      ;;
    *" rhel "*|*" fedora "*|*" centos "*)
      echo rhel
      return
      ;;
    *" arch "*)
      echo arch
      return
      ;;
    *" suse "*|*" opensuse "*)
      echo suse
      return
      ;;
  esac

  if command -v apt-get >/dev/null 2>&1; then
    echo debian
  elif command -v dnf >/dev/null 2>&1 || command -v yum >/dev/null 2>&1; then
    echo rhel
  elif command -v pacman >/dev/null 2>&1; then
    echo arch
  elif command -v zypper >/dev/null 2>&1; then
    echo suse
  else
    echo unknown
  fi
}

install_deps() {
  local family="$1"
  local pretty="unknown"
  if [[ -r /etc/os-release ]]; then
    # shellcheck disable=SC1091
    . /etc/os-release
    pretty="\${PRETTY_NAME:-\${ID:-unknown}}"
  fi

  echo "Detected system: $pretty"
  echo "Package family: $family"
  echo "Installing required libraries (may ask for your password)…"
  echo

  case "$family" in
    debian)
      sudo apt-get update
      sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \\
        libwebkit2gtk-4.1-0 libgtk-3-0 libayatana-appindicator3-1
      ;;
    rhel)
      if command -v dnf >/dev/null 2>&1; then
        sudo dnf install -y webkit2gtk4.1 gtk3 libayatana-appindicator
      else
        sudo yum install -y webkit2gtk4.1 gtk3 libayatana-appindicator
      fi
      ;;
    arch)
      sudo pacman -Sy --needed --noconfirm \\
        webkit2gtk-4.1 gtk3 libayatana-appindicator
      ;;
    suse)
      sudo zypper --non-interactive refresh
      if ! sudo zypper --non-interactive install -y \\
        webkit2gtk-4_1-0 libgtk-3-0 libayatana-appindicator3-1; then
        sudo zypper --non-interactive install -y \\
          webkit2gtk3 gtk3 libayatana-appindicator3-1
      fi
      ;;
    *)
      echo "Could not detect a supported package manager."
      echo "Install WebKit2GTK 4.1, GTK 3, and Ayatana AppIndicator manually,"
      echo "then re-run this installer. See:"
      echo "  https://github.com/lazy-nevis/lazy-nevis/blob/main/docs/install/linux.md"
      read -r -p "Press Enter to close…"
      exit 1
      ;;
  esac

  echo
  echo "Libraries installed."
  echo
}

FAMILY="$(detect_family)"
install_deps "$FAMILY"

echo "Downloading and running the official install script…"
echo

bash <(curl -fL "${scriptUrl}")${flag}

echo
echo "Done. You can close this window."
read -r -p "Press Enter to close…"
`
}

function windowsCmdHelperBody(channel: InstallChannel): string {
  const prereleaseFlag = channel === 'prerelease' ? ' -Prerelease' : ''
  // CMD launches PowerShell; the official install.ps1 runs inside PowerShell.
  const psCommand = `& ([scriptblock]::Create((iwr '${INSTALL_SCRIPT_URLS.ps1}' -UseBasicParsing).Content))${prereleaseFlag}`
  // Escape for cmd.exe: double quotes inside -Command need doubling.
  const escaped = psCommand.replace(/"/g, '""')
  return `@echo off
title LazyNevis installer
echo LazyNevis installer
echo A black window is normal — PowerShell will run the official installer.
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "${escaped}"
set EXITCODE=%ERRORLEVEL%

echo.
if %EXITCODE% neq 0 (
  echo Install finished with an error. See the messages above.
) else (
  echo Done. You can close this window.
)
echo.
pause
exit /b %EXITCODE%
`
}

export function buildInstallHelper(
  platform: InstallPlatform,
  channel: InstallChannel,
): InstallHelperFile {
  const suffix = channel === 'prerelease' ? '-prerelease' : ''

  if (platform === 'windows') {
    return {
      filename: `LazyNevis-install${suffix}.cmd`,
      mime: 'application/x-bat',
      content: windowsCmdHelperBody(channel),
    }
  }

  if (platform === 'macos') {
    return {
      filename: `LazyNevis-install${suffix}.command`,
      mime: 'application/x-sh',
      content: macosHelperBody(channel),
    }
  }

  return {
    filename: `LazyNevis-install${suffix}.sh`,
    mime: 'application/x-sh',
    content: linuxHelperBody(channel),
  }
}

/** Trigger a browser download of the platform helper (Blob + anchor). */
export function downloadInstallHelper(
  platform: InstallPlatform,
  channel: InstallChannel,
): void {
  const file = buildInstallHelper(platform, channel)
  const blob = new Blob([file.content], { type: `${file.mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = file.filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

/** Re-export for tests / callers that need the shell command string. */
export { getInstallCommand }
