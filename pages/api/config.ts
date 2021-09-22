import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
export default async (req : NextApiRequest, res: NextApiResponse) => {
    let config
    try {
        const file = JSON.parse(fs.readFileSync("bin/config.json", "utf8"))
        config = file
    }
    catch {
        return res.status(200).json({
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        config: config
    })
}