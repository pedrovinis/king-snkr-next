import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    let success = false
    try {
        const userData = req.body
        const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())

        fs.unlinkSync(`bin/users/${fUserData.name}.json`)
        success = true
    }
    catch {
        success = false
    }
    
    res.status(200).json({success:success})
}