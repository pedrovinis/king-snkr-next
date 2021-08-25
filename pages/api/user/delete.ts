import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const userData = req.body
    const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())

    fs.unlinkSync(`bin/users/${fUserData.name}.json`)

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
    
    res.status(200).json({sucess:true})
}