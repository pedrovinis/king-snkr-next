type Props = {
    size?: number | string
    fill?: string
  }
  
  export default function XIcon({ size = '20px', fill = 'white' }: Props) {
    return (
        <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
        shapeRendering="geometricPrecision"
        >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
        </svg>
    )
  }
  