import { LOCAL_LINK } from "./constants"

type Data = {
    url: string
    opts: JSON
}

export const fetchPayload = async(data:Data) => {
    const res = await fetch(`${LOCAL_LINK}/api/payload`, {
        method:'POST',
        body: btoa(JSON.stringify({
            url: data.url,
            opts: data.opts
        }))
    })
    return res
}