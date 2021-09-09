export const isActive = (expirationInMiliSeconds:number) => {
    if(expirationInMiliSeconds < Date.now()) return false
    else return true
}