import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvreq = await fetch(`${SITE_URL}/api/user/products`, {
        method: 'POST',
        headers: {
            'cookie': `__Secure-next-auth.session-token=${req.cookies[`pxv-auth.session.token`]}`
        },
    })
    const data = await pxvreq.json()
    
    res.status(200).json({
        success: data.success ? data.success : false,
        products: data.products? data.products : {}
    })
}