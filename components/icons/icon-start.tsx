type Props = {
  size?: number | string
  className?: string
  fill?: string
}

export default function StartIcon({ size = '20px', className = '', fill = 'white' }: Props) {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    className={className}
     width={size} height={size} viewBox="0 0 512.000000 512.000000"
     preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    fill={fill} stroke="none">
    <path d="M2310 5114 c-617 -74 -1112 -304 -1534 -713 -318 -309 -544 -679
    -670 -1095 -41 -132 -81 -333 -96 -468 -13 -125 -13 -431 0 -556 63 -587 330
    -1137 756 -1553 143 -139 239 -216 399 -321 290 -191 638 -324 1010 -385 158
    -26 612 -26 770 0 738 122 1349 513 1756 1126 183 275 309 581 373 906 36 181
    46 296 46 505 0 209 -10 324 -46 505 -101 510 -350 966 -730 1336 -382 370
    -833 598 -1368 690 -97 17 -173 22 -376 24 -140 2 -271 1 -290 -1z m556 -450
    c455 -67 868 -276 1197 -607 330 -331 531 -731 603 -1202 23 -152 23 -441 0
    -595 -71 -465 -276 -871 -606 -1200 -834 -835 -2166 -835 -3000 0 -330 330
    -535 736 -606 1201 -24 154 -24 433 0 593 68 464 274 874 606 1206 369 369
    822 577 1360 624 85 7 338 -4 446 -20z"/>
    <path d="M2199 3445 c-14 -8 -35 -27 -45 -42 -18 -27 -19 -62 -22 -808 -2
    -429 0 -799 3 -823 13 -86 90 -138 168 -113 47 16 1118 794 1139 828 22 34 23
    94 3 133 -10 19 -193 158 -546 415 -292 212 -545 395 -562 406 -37 22 -101 24
    -138 4z"/>
    </g>
    </svg>
  )
}