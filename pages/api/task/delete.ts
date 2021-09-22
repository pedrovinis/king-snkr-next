import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    let success = false
    try {
        const taskData = req.body
        const fTaskData = JSON.parse(Buffer.from(taskData, 'base64').toString())

        fs.unlinkSync(`bin/tasks/${fTaskData.name}.json`)
        success = true
    }
    catch {
        success = false
    }
    
    return res.status(200).json({success:success})
}