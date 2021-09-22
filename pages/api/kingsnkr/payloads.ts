import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvreq = await fetch(`${SITE_URL}/api/kingsnkr/payloads`, {
        method: 'POST',
        headers: {
            'cookie': `__Secure-next-auth.session-token=${req.cookies[`pxv-auth.session.token`]}`
        },
        body: req.body
    })
    const data = await pxvreq.json()

    return res.status(200).json({
        success: data.success,
        message: data.message,
        payloads: data.payloads || {}
    })
}