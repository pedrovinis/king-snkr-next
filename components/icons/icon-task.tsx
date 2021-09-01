type Props = {
    size?: number | string
}

export default function TaskIcon({ size = '20px' }: Props) {
  return (
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0, 0, 400,400"><g id="svgg"><path id="path0" d="M162.641 86.524 L 160.000 89.165 160.000 97.736 L 160.000 106.308 141.121 106.552 L 122.242 106.796 116.461 109.671 C 106.791 114.480,100.068 122.192,97.060 131.926 C 94.684 139.614,94.684 282.134,97.060 289.821 C 100.123 299.734,106.974 307.606,116.505 312.165 L 122.330 314.951 173.454 315.167 L 224.578 315.383 227.241 312.721 C 231.051 308.910,231.053 304.145,227.245 299.989 L 224.586 297.087 175.788 296.699 C 121.129 296.264,123.822 296.554,118.674 290.541 C 114.092 285.187,114.175 286.661,114.175 210.874 C 114.175 132.846,113.960 136.054,119.553 130.485 C 124.522 125.538,126.785 125.049,144.665 125.049 L 159.830 125.049 160.134 130.680 C 161.989 165.053,213.332 164.445,214.577 130.035 L 214.757 125.063 229.903 125.060 C 247.850 125.057,250.000 125.515,254.864 130.379 C 260.195 135.710,260.185 135.624,260.193 175.534 C 260.200 209.210,260.271 210.991,261.716 213.360 C 265.787 220.036,274.932 219.549,278.140 212.486 C 279.796 208.839,280.333 148.558,278.804 137.864 C 277.036 125.504,269.364 115.069,258.082 109.682 L 252.039 106.796 233.466 106.408 L 214.893 106.019 215.068 100.070 C 215.293 92.434,214.192 88.410,211.188 85.882 L 208.813 83.883 187.047 83.883 L 165.282 83.883 162.641 86.524 M195.728 117.359 L 195.728 132.194 193.087 134.835 C 189.533 138.389,185.281 138.528,181.566 135.211 L 179.029 132.946 178.789 117.735 L 178.548 102.524 187.138 102.524 L 195.728 102.524 195.728 117.359 M197.937 207.577 C 192.949 211.793,193.004 212.811,199.478 236.213 C 205.758 258.915,201.812 253.295,234.175 285.629 C 264.145 315.573,263.268 314.954,275.728 314.946 C 292.156 314.935,302.522 304.549,302.524 288.100 C 302.525 276.645,302.451 276.543,271.885 245.389 C 242.082 215.012,246.445 218.115,223.801 211.194 C 204.674 205.349,201.155 204.856,197.937 207.577 M226.869 231.993 L 233.646 234.021 250.215 250.603 L 266.783 267.185 260.768 273.200 L 254.753 279.215 238.444 262.906 L 222.135 246.597 219.806 238.446 C 217.086 228.930,217.071 228.805,218.784 229.462 C 219.503 229.738,223.142 230.877,226.869 231.993 M282.727 283.689 C 287.658 291.777,278.412 300.331,270.552 294.951 L 267.999 293.204 273.981 287.184 C 280.845 280.278,280.686 280.341,282.727 283.689 " stroke="none" fill="white" fillRule="evenodd"></path></g></svg>
  )
}