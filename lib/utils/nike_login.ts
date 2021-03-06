import { User } from "@lib/types"


export const NikeLogin = async(user:User, IFCSHOPSESSID:string) => {
    const data = await fetchLogin(user['email'], user['password'])
    const authCode = data.code
    await validateLoginAuthCode(authCode, IFCSHOPSESSID)
}

const fetchLogin = async (email:string, password:string) => {
    const res = await fetch("https://unite.nike.com/login?appVersion=907&experienceVersion=907&uxid=com.nike.commerce.nikedotcom.brazil.oauth.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=3&visitor=3e4a0125-c404-4558-9e88-9abf13aea66f", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "x-sec-clge-req-type": "ajax"
        },
        "referrer": "https://unite.nike.com/oauth.html?client_id=QLegGiUU042XMAUWE4qWL3fPUIrpQTnq&redirect_uri=https%3A%2F%2Fwww.nike.com.br%2Fapi%2Fv2%2Fauth%2Fnike-unite%2Fset&response_type=code&locale=pt_BR&state=%2F",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"username\":\"${email}\",\"password\":\"${password}\",\"client_id\":\"QLegGiUU042XMAUWE4qWL3fPUIrpQTnq\",\"ux_id\":\"com.nike.commerce.nikedotcom.brazil.oauth.web\",\"grant_type\":\"password\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      })
    const data = await res.json()
    return data
}

const validateLoginAuthCode = async(authCode:string, IFCSHOPSESSID:string) => {
    await fetch(`https://www.nike.com.br/api/v2/auth/nike-unite/set?code=${authCode}&state=/`, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "cookie": `IFCSHOPSESSID=${IFCSHOPSESSID}`,
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        })
}

export const verifyLogged = async(IFCSHOPSESSID:string) => {
    const res = await fetch("https://www.nike.com.br/Requisicao/Ajax", {
        "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "cookie": `IFCSHOPSESSID=${IFCSHOPSESSID}`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.nike.com.br/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
    const data = await res.json()

    if(data.Logado) return true
    return false
}