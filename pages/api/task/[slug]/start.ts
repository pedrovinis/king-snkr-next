import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import Task from '@lib/class/task'


export default async (req : NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug
    try {
        const file = JSON.parse(fs.readFileSync(`bin/tasks/${slug}.json`, "utf8"))
        file.active = true
        fs.writeFileSync(`bin/tasks/${slug}.json`, JSON.stringify(file))
    }
    catch {
        res.status(200).json({
            success: false
        })
    }

    res.status(200).json({
        success: true
    })
}

// const waitFor = async(snkrDropTime:number, time:number) => {
//     let cont = parseInt(snkrDropTime - ( new Date().getTime() / 1000 ))
//     while(cont > time) {
//         cont --
//         console.log(`Time remaining to drop: '${cont} seconds' `)
//         await new Promise(r => setTimeout(r, 1000))
//     }
// }