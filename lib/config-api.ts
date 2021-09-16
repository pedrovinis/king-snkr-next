export const configFetch = async() => {
    const res = await fetch('api/config', {
        method: 'GET',
    })
    return res
}

export const setConfigFetch = async(config={}) => {
    const res = await fetch('api/setconfig', {
        method: 'POST',
        body: btoa(JSON.stringify({
            config: config
        }))
    })
    
    return res
}