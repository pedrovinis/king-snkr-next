import { SITE_URL } from "./constants"

export const activateFetch = async(key:string) => {
    const res = await fetch('/api/kingsnkr/activate', {
        method:'POST',
        body: btoa(JSON.stringify({
            key: key
        }))
    })
    return res
}

export const payLoadsFecth = async() => {
    const res = await fetch(`/api/kingsnkr/payloads`, {
        method:'POST',
        headers: {}
    })
    return res
} 