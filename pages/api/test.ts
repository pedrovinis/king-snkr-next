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

    res.status(200).json(data)
}
