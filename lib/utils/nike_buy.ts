import { fetchPayload } from "@lib/payload-api"
import { Task } from "@lib/types"

interface Inike_add_cart {
    success?: boolean
    twoFactorAuth?: boolean
}

interface Inike_two_factor_generate {
    message?: string
    needLogin?: boolean
    twoFactorAuth?: boolean
    valid: boolean
}

export const nike_add_cart = async(payload:Object, task:Task) => {
    let strPayload = JSON.stringify(payload)
    strPayload = strPayload.replaceAll('${IFCSHOPSESSID}', task.user.authCookie)
    strPayload = strPayload.replaceAll('${SNKR_LINK}', task.snkr.link)
    strPayload = strPayload.replaceAll('${SIZE_CODE}', task.cfg.size.code)
    
    const fPayload = JSON.parse(strPayload)
    const res = await fetchPayload(fPayload)
    const data = await res.json()
    const nikeData:Inike_add_cart = JSON.parse(data.data)
    return nikeData 
}

export const nike_two_factor_generate = async(payload:Object, task:Task) => {
    let strPayload = JSON.stringify(payload)
    strPayload = strPayload.replaceAll('${IFCSHOPSESSID}', task.user.authCookie)
    strPayload = strPayload.replaceAll('${SNKR_LINK}', task.snkr.link)
    strPayload = strPayload.replaceAll('${PHONE_NUMBER}', task.user.phone)
    strPayload = strPayload.replaceAll('${SIZE_ID}', task.user.phone)

    const fPayload = JSON.parse(strPayload)
    const res = await fetchPayload(fPayload)
    const data = await res.json()
    const nikeData:Inike_two_factor_generate = JSON.parse(data.data)
    return nikeData
}