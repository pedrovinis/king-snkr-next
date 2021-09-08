interface Props {
    snkrName: string
    size?: string
}

export default function SnkrIcon( {size='300px', snkrName=''}:Props) {
    const snkrNameFormated = snkrName.toLowerCase().replace(/\s/g, "")
    let snkrSVG = 'default'

    if(snkrNameFormated.search('airforce1')>=0) snkrSVG = 'air-force-1'
    else if(snkrNameFormated.search('airjordan1low')>=0) snkrSVG = 'air-jordan-1-low'
    else if(snkrNameFormated.search('dunklow')>=0) snkrSVG = 'dunk-low'
    else if(snkrNameFormated.search('dunkhi')>=0) snkrSVG = 'dunk-high'
    else if(snkrNameFormated.search('flow2020ispa')>=0) snkrSVG = 'ispa-flow-2020'

    return (
    <>
        <img
        src={`/snkrs-icons/${snkrSVG}.png`}
        width={size}
        height={size}
        />
    </>
)
}