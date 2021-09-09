import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvres = await fetch(`${SITE_URL}/api/user/products`, {
        headers: {
            'cookie': `__Secure-next-auth.session-token=${req.cookies[`pxv-auth.session.token`]}`
        }
    })
    const data = await pxvres.json()

    res.status(200).json({
        success: true,
        products: data? data : {}
    })
}