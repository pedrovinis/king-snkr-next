import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    try {
        const slug = req.query.slug
        const file = JSON.parse(fs.readFileSync(`bin/tasks/${slug}.json`, "utf8"))
        file.active = false
        fs.writeFileSync(`bin/tasks/${slug}.json`, JSON.stringify(file))
    
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