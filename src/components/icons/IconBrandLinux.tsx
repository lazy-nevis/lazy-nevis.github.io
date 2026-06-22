import type { SVGProps } from 'react'

/** Linux / Tux mark — Tabler has no brand-linux icon. */
export function IconBrandLinux(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="14.5" rx="6.5" ry="7" />
      <ellipse cx="12" cy="6.5" rx="4.5" ry="4.5" />
      <path d="M8.5 5.5c-.8-1.2-.3-2.5 1-2.5s1.8 1.3 1 2.5" />
      <path d="M15.5 5.5c.8-1.2.3-2.5-1-2.5s-1.8 1.3-1 2.5" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <path d="M10.5 9.5c.8.5 2.2.5 3 0" />
      <ellipse cx="9" cy="13.5" rx="1.25" ry="1.75" fill="currentColor" stroke="none" />
      <ellipse cx="15" cy="13.5" rx="1.25" ry="1.75" fill="currentColor" stroke="none" />
      <path d="M12 11.5v2.5" />
    </svg>
  )
}
