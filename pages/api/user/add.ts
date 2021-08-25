import type { NextApiRequest, NextApiResponse } from 'next'
import BrowserClass from '@lib/class/browser'
import  UserClass from '@lib/class/user'
import { NikeLogin, verifyLogged } from '@lib/utils/nike_login'

import { User } from '@lib/types'

const formatUserData = (userData:any) => {
    const fUserData = JSON.parse(Buffer.from(userData, 'base64').toString())
    return {
        name: fUserData.name,
        slug: fUserData.name,
        email: fUserData.email,
        phone: fUserData.phone,
        password: fUserData.password,
        //@ts-ignore
        createdAt: parseInt(new Date().getTime() / 1000),
        validated: false,
        authCookieCreatedAt: 'none',
        authCookie: 'none'
    }
}

export default async (req : NextApiRequest, res: NextApiResponse) => {
    let sucess = false
    try {
        const userData = req.body
        const formatedUserData:User = formatUserData(userData)

        const user = new UserClass()
        user.setName(formatedUserData.name)
        user.setNikeEmail(formatedUserData.email)
        user.setSlug(formatedUserData.slug)
        user.setNikePassword(formatedUserData.password)
        user.setNikePhone(formatedUserData.phone)
        user.setCreatedAt(formatedUserData.createdAt)

        const b1 = await new BrowserClass()
        
        await NikeLogin(b1, user)
        const logged = await verifyLogged(b1)

        if(logged) {
            user.setNikePassword('SECRET')
            user.saveConfigs()
        }
        
        sucess = logged
    }
    catch {
        sucess = false
    }
   

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
    
    res.status(200).json({success:sucess})
}