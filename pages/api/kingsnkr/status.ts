import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvreq = await fetch(`${SITE_URL}/api/kingsnkr/status`)
    const data = await pxvreq.json()

    return res.status(200).json({
        success: data.success,
        status: data.status
    })
}