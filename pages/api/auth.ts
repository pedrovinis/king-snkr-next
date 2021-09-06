import { SITE_URL } from '@lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const pxvAuthToken = ''

    const authReq = await fetch(`${SITE_URL}/api/auth/session`, {
        headers: {
            "Cookie": `__Secure-next-auth.session-token=${pxvAuthToken}`
        }
    })
    const data = await authReq.json()

    res.status(200).json(data)
}