export const isActive = (expirationInSeconds:number|null|undefined) => {
    if(!expirationInSeconds) return false
    if(expirationInSeconds < (Date.now() / 1000)) return false
    return true
}