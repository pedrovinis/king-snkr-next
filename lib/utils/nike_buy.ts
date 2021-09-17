import { fetchPayload } from "@lib/payload-api"
import { Task } from "@lib/types"

interface INikeAddCartReturn {
    success?: boolean
    twoFactorAuth?: boolean
}

export const nike_add_cart = async(payload:Object, task:Task) => {
    let strPayload = JSON.stringify(payload)
    console.log(strPayload)
    strPayload = strPayload.replaceAll('${IFCSHOPSESSID}', task.user.authCookie)
    strPayload = strPayload.replaceAll('${SIZE_CODE}', task.cfg.size.code)
    strPayload = strPayload.replaceAll('${SNKR_LINK}', task.snkr.link)
    
    const fPayload = JSON.parse(strPayload)
    const res = await fetchPayload(fPayload)
    const data = await res.json()
    const nikeData:INikeAddCartReturn = JSON.parse(data.data)
    return nikeData 
}