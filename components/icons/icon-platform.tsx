type Props = { color: string; size?: number | string };

export default function PlatformLogo({ color, size = 20 }: Props) {
  return (
<svg 
version="1.0"
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 230.000000 230.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,230.000000) scale(0.100000,-0.100000)" fill="var(--secondary)" stroke="none">
    <path d="M712 1435 c-237 -476 -432 -867 -432 -870 0 -3 71 -4 157 -3 l158 3
      275 547 c151 302 277 548 280 548 3 0 157 -304 343 -675 l337 -675 -840 0
      -840 0 -75 -150 c-41 -82 -75 -152 -75 -155 0 -3 518 -5 1150 -5 633 0 1150 2
      1150 5 0 10 -1145 2295 -1150 2295 -3 0 -200 -389 -438 -865z"
      fill={color}
    >
  <rect width="100%" height="100%" rx="16" />
  </path></g></svg>
  )
}
