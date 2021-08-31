type Props = {
  size?: number | string
  fill?: string
}

export default function PauseIcon({ size = '20px', fill= 'white' }: Props) {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     width={size} height={size} viewBox="0 0 512.000000 512.000000"
     preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill={fill} stroke="none">
    <path d="M2240 5105 c-444 -55 -852 -220 -1220 -493 -150 -112 -400 -362 -512
    -512 -276 -372 -439 -779 -494 -1230 -17 -148 -17 -472 0 -620 55 -451 218
    -858 494 -1230 112 -150 362 -400 512 -512 372 -276 779 -439 1230 -494 148
    -17 472 -17 620 0 451 55 858 218 1230 494 150 112 400 362 512 512 276 372
    439 779 494 1230 17 148 17 472 0 620 -55 451 -218 858 -494 1230 -112 150
    -362 400 -512 512 -372 276 -779 439 -1230 494 -143 17 -488 16 -630 -1z m637
    -314 c996 -147 1767 -918 1914 -1914 26 -181 26 -453 0 -634 -147 -996 -918
    -1767 -1914 -1914 -181 -26 -453 -26 -634 0 -996 147 -1767 918 -1914 1914
    -26 181 -26 453 0 634 146 992 914 1763 1905 1913 173 26 468 26 643 1z"/>
    <path d="M2032 3743 c-34 -7 -98 -75 -105 -113 -4 -18 -7 -499 -7 -1070 0
    -571 3 -1052 7 -1070 10 -51 72 -107 128 -115 37 -6 54 -3 92 16 90 47 83 -52
    83 1169 0 1028 -1 1077 -19 1110 -31 58 -103 87 -179 73z"/>
    <path d="M2971 3728 c-88 -47 -81 49 -81 -1168 0 -1221 -7 -1122 83 -1169 38
    -19 55 -22 92 -16 64 9 121 66 130 127 3 24 5 516 3 1093 l-3 1050 -22 31
    c-50 70 -130 91 -202 52z"/>
    </g>
    </svg>
    
  )
}
