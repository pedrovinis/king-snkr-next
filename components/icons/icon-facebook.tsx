type Props = {
  size?: string | number
  fill?: string
}

export default function FacebookIcon({ fill= 'white', size = '22' }: Props) {
  return (
<svg version="1.1" id="facebook"xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 500 500">
<path fill="#3C5A99" d="M134.7,120c-13.7,0.3-14.7,14.7-14.7,14.7s0.1,224.3,0,237.4c-0.1,13.1,14.7,14.7,14.7,14.7l127.8,0V283.6
	h-34.8v-40.3h34.8v-29.7c0.2-57,51.8-53.2,51.8-53.2s31.1,0,31.1,1.6v36h-21.3c-22.7-0.2-20,19.6-20,19.6v25.7H344l-5.2,40.3h-34.7
	v103.4c0,0,53.3,0,68,0c14.7,0,14.7-14.7,14.7-14.7s0.4-223,0-237.4c-0.4-14.4-14.7-14.7-14.7-14.7H134.7z"/>
</svg>

  )
}
