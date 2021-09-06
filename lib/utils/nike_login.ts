import User from "@lib/class/user"

export const NikeLogin = async(user:User, IFCSHOPSESSID:string) => {
    const data = await fetchLogin(user.getNikeEmail(), user.getNikePassword(), IFCSHOPSESSID)
    const authCode = data.code
    await validateLoginAuthCode(authCode, IFCSHOPSESSID)
}

const fetchLogin = async (email:string, password:string, IFCSHOPSESSID:string) => {
    const res = await fetch("https://unite.nike.com.br/partnerLogin?appVersion=905&experienceVersion=905&uxid=com.nike.commerce.nikedotcom.brazil.oauth.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "cookie": `IFCSHOPSESSID=${IFCSHOPSESSID}`,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-sec-clge-req-type": "ajax"
        },
        "referrer": `https://unite.nike.com.br/oauth.html?client_id=QLegGiUU042XMAUWE4qWL3fPUIrpQTnq&redirect_uri=https%3A%2F%2Fwww.nike.com.br%2Fapi%2Fv2%2Fauth%2Fnike-unite%2Fset&response_type=code&locale=pt_BR&state=%2F`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"username\":\"${email}\",\"password\":\"${password}\",\"client_id\":\"QLegGiUU042XMAUWE4qWL3fPUIrpQTnq\",\"state\":{}}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
        })
    const data = await res.json()
    return data
}

const validateLoginAuthCode = async(authCode:string, IFCSHOPSESSID:string) => {
    const res = await fetch(`https://www.nike.com.br/api/v2/auth/nike-unite/set?code=${authCode}&state=/`, {
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
    else return false
}