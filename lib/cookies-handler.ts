export const getCookie = (cname: string) => {
    let name = `${cname}=`
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
}

export const createCookieString = (cname: string, cvalue:string, exdays:number = 120) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  let expires = d.toUTCString()
  return `${cname}=${cvalue};expires=${expires};path=/`
}