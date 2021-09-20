import type { NextApiRequest, NextApiResponse } from 'next'
import { getAndFormatSnkrData } from '@lib/utils/nike_snkr_data'
import { saveConfigsJSON } from '@lib/utils/file-save'
import { Snkr } from '@lib/types'

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
    
    const snkrData: Snkr = {
        plataform: 'NIKE',
        name: '',
        edition: '',
        image: '',
        id: '',
        plataform_id: '',
        slug: '',
        link: '',
        sizes: [],
        release: 0,
        sale_price: '',
        kingsnkr_id: ''
    }
    
    try {
        const bodyData = JSON.parse(Buffer.from(req.body, 'base64').toString())
        let link:string = bodyData.snkr_link.trim()
        if(!link.startsWith('https://')) link = 'https://'+link
        
        const fSnkrData = await getAndFormatSnkrData(link)

        snkrData['link'] = link
        snkrData['name'] = fSnkrData.name
        snkrData['edition'] = fSnkrData.edition
        snkrData['image'] = fSnkrData.image
        snkrData['id'] = fSnkrData.id
        snkrData['plataform_id'] = fSnkrData.nike_id
        snkrData['sale_price'] = fSnkrData.sale_price
        snkrData['release'] = fSnkrData.release
        snkrData['sizes'] = formatSizes(fSnkrData.sizes)
        snkrData['kingsnkr_id'] = `${snkrData.plataform} - ${snkrData.plataform_id}`
        snkrData['slug'] = snkrData['kingsnkr_id']

        saveConfigsJSON(`bin/snkrs/${snkrData.kingsnkr_id}`, snkrData)
        success = true
    }   
    catch {
        success = false
    }

    res.status(200).json({
        success:success,
        name: snkrData['name']
    })
}