import type { NextApiRequest, NextApiResponse } from 'next'
import  UserClass from '@lib/class/user'
import { NikeLogin, verifyLogged } from '@lib/utils/nike_login'
//@ts-ignore
import randomToken from 'random-token'

import { User } from '@lib/types'

const formatUserData = (userData:any) => {
    const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())
    //@ts-ignore
    const now = parseInt(new Date().getTime() / 1000)
    return {
        name: fUserData.name.trim(),
        slug: fUserData.name.trim(),
        email: fUserData.email.trim(),
        phone: fUserData.phone.replace(/\D/g, ""),
        password: fUserData.password,
        createdAt: now,
        validated: false,
        authCookieCreatedAt: now,
        authCookie: randomToken(26)
    }
}

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const userData = req.body
    const formatedUserData:User = formatUserData(userData)

    const user = new UserClass()
    user.setName(formatedUserData.name)
    user.setNikeEmail(formatedUserData.email)
    user.setSlug(formatedUserData.slug)
    user.setNikePassword(formatedUserData.password)
    user.setNikePhone(formatedUserData.phone)
    user.setCreatedAt(formatedUserData.createdAt)
    user.setAuthCookie(formatedUserData.authCookie)
    user.setauthCookieCreatedAt(formatedUserData.authCookieCreatedAt)

    console.log('IFCSHOPSESSID:' + user.getauthCookie())
    const IFCSHOPSESSID = user.getauthCookie()
    await NikeLogin(user, IFCSHOPSESSID)
    const logged = await verifyLogged(IFCSHOPSESSID)

    if(!logged) {
        res.status(200).json({success:false})
    }
    
    user.setNikePassword('SECRET')
    user.saveConfigs()
    res.status(200).json({success:true})
}