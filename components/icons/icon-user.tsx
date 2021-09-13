type Props = {
    size?: number | string
    fill?: string
}

export default function UserIcon({ size = '20px', fill = 'var(--accents-1)' }: Props) {
  return (
    <svg fill="none" height={size} stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
}
