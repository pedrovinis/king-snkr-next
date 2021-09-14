interface Props {
    snkrName: string
    size?: string
}

export default function SnkrIcon( {size='300px', snkrName=''}:Props) {
    const snkrNameFormated = snkrName.toLowerCase().replace(/\s/g, "")
    let snkrSVG = 'default'
    const snkrs = [
        ['airforce1', 'air-force-1'],
        ['airjordan1low', 'air-jordan-1-low'],
        ['dunklow', 'dunk-low'],
        ['dunkhi', 'dunk-high'],
        ['flow2020ispa', 'ispa-flow-2020']
    ]

    for(let i=0; i<snkrs.length; i++) {
        if(snkrNameFormated.search(snkrs[i][0])>=0) snkrSVG = snkrs[i][1]
    }

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