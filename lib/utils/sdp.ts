const crypto = require('crypto')
const algorithm = 'aes256'

export const encrypt = (value:string, localKey:string, userId:string, ) => {
    console.log(localKey)
    console.log(userId)
    try {
        const key = localKey+userId
        const cipher = crypto.createCipher(algorithm, key)
        const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex')
        return encrypted
    }
    catch {
        return null
    }
}

export const decrypt = (value:string, localKey:string, userId:string) => {
    try {
        const key = localKey+userId
        const decipher = crypto.createDecipher(algorithm, key)
        const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8')
        return decrypted
    }
    catch {
        return null
    }
}