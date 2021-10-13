type Props = {
    size?: number | string
    fill?: string
}
  
export default function ARROWDOWNICON({ size = '20px', fill = 'currentcolor' }: Props) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke={fill}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={"none"}
            shapeRendering="geometricPrecision"
        >
        <path d="M6 9l6 6 6-6"></path>
        </svg>
    )
}
  