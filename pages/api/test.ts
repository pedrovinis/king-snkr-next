import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore

export default async (req : NextApiRequest, res: NextApiResponse) => {

    const data = ''
    
    res.status(200).json({
        data
    })
}
