import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { CONFIG_OPTIONS } from '@lib/constants'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    try {
        const data = JSON.parse(Buffer.from(req.body, 'base64').toString())
        
        const fLocale = CONFIG_OPTIONS.locale.find( f => f == data.config.locale)
        const fLang:any = CONFIG_OPTIONS.lang.find(f => f[0] == data.config.lang)

        const fConfig = {
            hideContent: data.config?.hideContent ? true : false,
            locale: fLocale || CONFIG_OPTIONS.locale[0],
            lang: fLang[0] || CONFIG_OPTIONS.lang[0][0]
        }

        fs.writeFileSync(`bin/config.json`, JSON.stringify(fConfig))
    
        res.status(200).json({
            success: true
        })
    }
    catch {
        res.status(200).json({
            success: false
        })
    }
}