export const  activateFetch = async(key:string) => {
    const res = await fetch('/api/kingsnkr/activate', {
        method:'POST',
        body: btoa(JSON.stringify({
            key: key
        }))
    })
    return res
}