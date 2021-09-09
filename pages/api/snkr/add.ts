import type { NextApiRequest, NextApiResponse } from 'next'
import SnkrClass from '@lib/class/snkr'
import { getAndFormatSnkrData } from '@lib/utils/snkr_data'

const formatSizes:any = (sizes:any) => {
    const sizesValue = Object.keys(sizes)
    const fSizes = sizesValue.map( (sizeValue:any) => {
        return {
            value: sizes[sizeValue].Tamanho,
            id: sizes[sizeValue].ProdutoId,
            code: sizes[sizeValue].Codigo
        }
    })
    return fSizes
}
export default async (req : NextApiRequest, res: NextApiResponse) => {
    let success = false
    const snkr = new SnkrClass()
    
    try {
        const fSnkrData = JSON.parse(Buffer.from(req.body, 'base64').toString())
        let link:string = fSnkrData.snkr_link.trim()
        if(!link.startsWith('https://')) link = 'https://'+link
        
        const snkrData = await getAndFormatSnkrData(link)

        snkr.setSnkrLink(link)
        snkr.setSnkrName(snkrData.snkr_name)
        snkr.setSnkrEdition(snkrData.snkr_edition)
        snkr.setSnkrId(snkrData.snkr_id)
        snkr.setSnkrSlug(snkrData.snkr_id)
        snkr.setSnkrSalePrice(snkrData.snkr_sale_price)
        snkr.setSnkrRelease(snkrData.snkr_release)
        snkr.setSnkrSizes(formatSizes(snkrData.sizes))

        snkr.saveConfigs()
        success = true
    }   
    catch {
        success = false
    }

    res.status(200).json({
        success:success,
        name: snkr.getSnkrName()
    })
}