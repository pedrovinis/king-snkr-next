import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    let success = false
    try {
        const snkrData = req.body
        
        const fSnkrData = JSON.parse(Buffer.from(snkrData, 'base64').toString())
        fs.unlinkSync(`bin/snkrs/${fSnkrData.kingsnkr_id}.json`)
        success = true
    }
    catch {
        success = false
    }
    
    return res.status(200).json({success:success})
}