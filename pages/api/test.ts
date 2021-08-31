import Browser from '@lib/class/browser'
import Page from '@lib/class/page'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    
    res.status(200).json({success:true})
}