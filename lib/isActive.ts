export const isActive = (expirationInSeconds: number | null | undefined) => {
    if(!expirationInSeconds || expirationInSeconds < (Date.now() / 1000)) return false
    return true
}