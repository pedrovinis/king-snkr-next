import type { NextApiRequest, NextApiResponse } from 'next'
import { NikeLogin, verifyLogged } from '@lib/utils/nike_login'
//@ts-ignore
import randomToken from 'random-token'

import { User } from '@lib/types'
import { saveConfigsJSON } from '@lib/utils/file-save'

const formatUserData = (userData:any) => {
    const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())
    //@ts-ignore
    const now = parseInt(new Date().getTime() / 1000)
    return {
        plataform: '',
        name: fUserData.name.trim(),
        slug: fUserData.name.trim(),
        email: fUserData.email.trim(),
        phone: fUserData.phone.replace(/\D/g, ""),
        password: fUserData.password,
        created_at: now,
        authCookieCreatedAt: now,
        authCookie: randomToken(26)
    }
}

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const bodyData = req.body
    const formatedUserData:User = formatUserData(bodyData)

    const userData:User = {
        plataform: '',
        name: '',
        email: '',
        slug: '',
        password: '',
        phone: '',
        created_at: 0,
        authCookie: '',
        authCookieCreatedAt: 0,
    }

    userData['name'] = formatedUserData.name
    userData['email'] = formatedUserData.email
    userData['slug'] = formatedUserData.slug
    userData['password'] = formatedUserData.password
    userData['phone'] = formatedUserData.phone
    userData['created_at'] = formatedUserData.created_at
    userData['authCookie'] = formatedUserData.authCookie
    userData['authCookieCreatedAt'] = formatedUserData.authCookieCreatedAt

    const IFCSHOPSESSID = userData['authCookie']
    console.log('IFCSHOPSESSID: ' + IFCSHOPSESSID)
    await NikeLogin(userData, IFCSHOPSESSID)
    const logged = await verifyLogged(IFCSHOPSESSID)

    if(!logged) {
        return res.status(200).json({success:false})
    }
    
    userData['password'] = 'SECRET'
    saveConfigsJSON(`bin/users/${userData.name}`, userData)

    return res.status(200).json({success:true})
}