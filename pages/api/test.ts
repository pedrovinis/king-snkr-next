import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore

export default async (req : NextApiRequest, res: NextApiResponse) => {
    var crypto = require('crypto')

    const algorithm = 'aes256'
    const key = 'SECRETKEYwaddwaadwadwawd'
    const key2 = ''
    const text = '1password1'

    let encrypted=null, decrypted=null

    try {
        const cipher = crypto.createCipher(algorithm, key)
        encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
        const decipher = crypto.createDecipher(algorithm, key2)
        decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
    }
    catch {

    }

    res.status(200).json({
        encrypted,
        decrypted
    })
}
