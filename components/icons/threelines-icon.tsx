type Props = {
    size?: number | string
    fill?: string
}
  
export default function THREELINESICON({ size = '24px', fill = 'currentcolor' }: Props) {
    return (
        <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </svg>
    )
}
  