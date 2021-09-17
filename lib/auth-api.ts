import { LOCAL_LINK } from "./constants"

export const sessionFetch = async() => {
    const res = await fetch(`${LOCAL_LINK}/api/auth`, {
        method: 'GET',
    })
    return res
}