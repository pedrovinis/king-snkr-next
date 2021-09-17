import { LOCAL_LINK } from "./constants"

export const activateFetch = async(key:string) => {
    const res = await fetch(`${LOCAL_LINK}/api/kingsnkr/activate`, {
        method:'POST',
        body: btoa(JSON.stringify({
            key: key
        }))
    })
    return res
}

export const payLoadsFecth = async() => {
    const res = await fetch(`${LOCAL_LINK}/api/kingsnkr/payloads`, {
        method:'POST',
        headers: {}
    })
    return res
} 