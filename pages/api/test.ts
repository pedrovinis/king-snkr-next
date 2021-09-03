import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    console.log(req.query)


    res.status(200).json({success:true})
}