import { LOCAL_LINK } from "./constants"

export const configFetch = async() => {
    const res = await fetch(`${LOCAL_LINK}/api/config`, {
        method: 'GET',
    })
    return res
}

export const setConfigFetch = async(config={}) => {
    const res = await fetch(`${LOCAL_LINK}/api/setconfig`, {
        method: 'POST',
        body: btoa(JSON.stringify({
            config: config
        }))
    })
    
    return res
}