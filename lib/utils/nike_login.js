import Page from '@lib/class/page'

export const NikeLogin = async(browser, user) => {
    const page = await new Page(browser.getBrowser())
    await gotoLoginPage(page)
    const clientId = await getClientIdByUrl(page.url())
    const resNikeLogin = await fetchLogin(page, user.getNikeEmail(), user.getNikePassword(), clientId)
    const authToken = await getLoginAuthToken(resNikeLogin)
    await validateLoginAuthToken(page, authToken)
    await page.closeNow()
}

const gotoLoginPage = async(page) => {
    await page.goto('https://www.nike.com.br/api/v2/auth/nike-unite/set?code=&state=/')
    await page.click('[type="button"]')
}

const getClientIdByUrl = async (url) => {
    const startPoint = url.search('=') + 1
    const endPoint = url.search('&')
    const clientID = url.slice(startPoint, endPoint)

    return clientID
}

const fetchLogin = async (page, email, password, client_id) => {
    page.page.evaluate( (email, password, client_id) => {
        fetch("https://unite.nike.com.br/partnerLogin?appVersion=905&experienceVersion=905&uxid=com.nike.commerce.nikedotcom.brazil.oauth.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=", {
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
        "referrer": `https://unite.nike.com.br/oauth.html?client_id=${client_id}&redirect_uri=https%3A%2F%2Fwww.nike.com.br%2Fapi%2Fv2%2Fauth%2Fnike-unite%2Fset&response_type=code&locale=pt_BR&state=%2F`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"username\":\"${email}\",\"password\":\"${password}\",\"client_id\":\"${client_id}\",\"state\":{}}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
        })
    }, email, password, client_id)
    const res = await getLoginResponse(page)
    return res
}

const getLoginResponse = async (page) => {
    const res = await page.waitForSpecificResponse('https://unite.nike.com.br/partnerLogin?appVersion=905&experienceVersion=905&uxid=com.nike.commerce.nikedotcom.brazil.oauth.web&locale=pt_BR&backendEnvironment=identity&browser=Google%20Inc.&os=undefined&mobile=false&native=false&visit=1&visitor=')
    return res
}

const getLoginAuthToken = async(fetchLoginResponse) => {
    const data = await fetchLoginResponse.json()
    const authToken = data.code
    return authToken
}

const validateLoginAuthToken = async(page, authToken) => {
    await page.goto(`https://www.nike.com.br/api/v2/auth/nike-unite/set?code=${authToken}&state=/`) //Auto redirect to Nike Home if got sucess.
}

export const verifyLogged = async(browser) => {
    const page = await new Page(browser.getBrowser())
    page.goto('https://www.nike.com.br/')
    
    const ajaxRes = await getAjaxResponse(page)
    const data = await ajaxRes.json()

    await page.closeNow()

    return data.Logado
}

const getAjaxResponse = async(page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/Requisicao/Ajax')
    return res
}

export const setAuthCookie = async (page, authCookie)=> {
    await page.setCookie({
        'name': 'IFCSHOPSESSID',
        'value': authCookie,
        'domain': '.nike.com.br'
    })
}

export const getAuthCookieValue = async(browser) => {
    const page = await new Page(browser.getBrowser())
    await page.goto('https://www.nike.com.br/')
    const allCookies = await page.getCookies()
    const authCookie = allCookies.find( (cookie) => {
        return cookie.name == 'IFCSHOPSESSID'
    })
    await page.closeNow()
    return authCookie.value
}