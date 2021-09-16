export const configFetch = async() => {
    const res = await fetch('http://localhost:3000/api/config', {
        method: 'GET',
    })
    return res
}

export const setConfigFetch = async(config={}) => {
    const res = await fetch('http://localhost:3000/api/setconfig', {
        method: 'POST',
        body: btoa(JSON.stringify({
            config: config
        }))
    })
    
    return res
}