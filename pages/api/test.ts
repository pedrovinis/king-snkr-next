import type { NextApiRequest, NextApiResponse } from 'next'
import { createBrowser } from '@lib/sharedBrowser'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    console.log(req.query)


    res.status(200).json({success:true})
}