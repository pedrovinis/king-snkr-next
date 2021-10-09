import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore

export default async (req : NextApiRequest, res: NextApiResponse) => {

    const res1 = await fetch("https://unite.nike.com/rfYqH/bMK5/4fzE/3m/qRSHB/G1YfLVXb/UApRcXVcJg/TlwN/a2tVGy0B", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "X-Sec-Clge-Req-Type": "ajax",
            "Content-Type": "text/plain;charset=UTF-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://unite.nike.com/oauth.html?client_id=QLegGiUU042XMAUWE4qWL3fPUIrpQTnq&redirect_uri=https%3A%2F%2Fwww.nike.com.br%2Fapi%2Fv2%2Fauth%2Fnike-unite%2Fset&response_type=code&locale=pt_BR&state=%2F",
        "body": "{\"sensor_data\":\"\"}",
        "method": "POST",
        "mode": "cors"
    })

    const cookiesHeader:string = res1.headers.get('set-cookie')
    const abckStart = cookiesHeader.search('_abck') + 6
    const abckSliced = cookiesHeader.slice(abckStart, cookiesHeader.length)
    const abckEnd = abckSliced?.search(';')
    const abck = abckSliced.slice(0, abckEnd)

    const akbmscStart = cookiesHeader.search('ak_bmsc') + 8
    const akbmscSliced = cookiesHeader.slice(akbmscStart, cookiesHeader.length)
    const akbmscEnd = akbmscSliced?.search(';')
    const akbmsc = akbmscSliced.slice(0, akbmscEnd)

    const bmszStart = cookiesHeader.search('bm_sz') + 6
    const bmszSliced = cookiesHeader.slice(bmszStart, cookiesHeader.length)
    const bmszEnd = bmszSliced?.search(';')
    const bmsz = bmszSliced.slice(0, bmszEnd)


    const ress = await fetch("https://unite.nike.com/login?appVersion=908&experienceVersion=908&uxid=com.nike.commerce.nikedotcom.brazil.oauth.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=2&visitor=be81117d-2c56-46b3-8520-2a598a33afbd", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cookie": `bm_sz=${bmsz};ak_bmsc=${akbmsc};_abck=${abck}`,
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-gpc": "1",
    "x-kpsdk-cd": "{\"workTime\":1633613684135,\"id\":\"a6080d5e86f30f10908d2161a3536566\",\"answers\":[2,7]}",
    "x-kpsdk-ct": "0zlsyoSFuNgo78xA0bBR1oEfdSKe2EjxZeZWPwnZBFN10adosfjLYT51KaV6HnX4GTraJLNoeSvUjJ9i1GGWdRa01BGl4wvaaK8G2sttZut6iQm2KYj8kNYJPCB2D4PiKeFM1AKO8vFOyhPtoaCEcCLVH",
    "x-sec-clge-req-type": "ajax",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
  },
  "referrer": "https://unite.nike.com/oauth.html?client_id=QLegGiUU042XMAUWE4qWL3fPUIrpQTnq&redirect_uri=https%3A%2F%2Fwww.nike.com.br%2Fapi%2Fv2%2Fauth%2Fnike-unite%2Fset&response_type=code&locale=pt_BR&state=%2F",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"username\":\"pedrovini2002@gmail.com\",\"password\":\"Santacat123\",\"client_id\":\"QLegGiUU042XMAUWE4qWL3fPUIrpQTnq\",\"ux_id\":\"com.nike.commerce.nikedotcom.brazil.oauth.web\",\"grant_type\":\"password\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

    const data = await ress.text()

    res.status(200).json(data)
}
