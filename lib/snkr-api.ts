export const addSnkrFetch = async(snkr_link:string) => {
    const res = await fetch('api/snkr/add', {
        method:'POST',
        body: btoa(JSON.stringify({
            snkr_link: snkr_link
        }))
    })
    return res
}