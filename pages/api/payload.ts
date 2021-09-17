import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {    
    try {
        const body = JSON.parse(Buffer.from(req.body, 'base64').toString())

        const fetchRes = await fetch(body.url, body.opts)
        const data = await fetchRes.text()

        res.status(200).json({
            success: true,
            data: data,
        })
    }
    catch {
        res.status(200).json({
            success: false,
            data: null
        })
    }


}