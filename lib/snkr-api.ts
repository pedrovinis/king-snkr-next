import { Snkr } from "./types"

export const addSnkrFetch = async(snkr_link:string) => {
    const res = await fetch('api/snkr/add', {
        method:'POST',
        body: btoa(JSON.stringify({
            snkr_link: snkr_link
        }))
    })
    return res
}

export const deleteSnkrFetch = async(snkr:Snkr) => {
    const res = await fetch('/api/snkr/delete', {
        method:'POST',
        body: btoa(JSON.stringify({
            id: snkr.id,
            name: snkr.name
        }))
    })
    return res
}