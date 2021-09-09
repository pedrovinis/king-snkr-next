import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvreq = await fetch(`${SITE_URL}/api/kingsnkr/activate`, {
        method: 'POST',
        headers: {
            'cookie': `__Secure-next-auth.session-token=${req.cookies[`pxv-auth.session.token`]}`
        },
        body: req.body

    })
    const data = await pxvreq.text()

    res.status(200).json({
        data: data ? data : {}
    })
}