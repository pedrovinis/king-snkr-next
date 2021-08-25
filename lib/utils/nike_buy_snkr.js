const fetchAddCart = async(snkrLink, sizeCode, page) => {
    page.page.evaluate( (snkrLink, sizeCode) => {
        fetch("https://www.nike.com.br/Carrinho/Adicionar", {
            "headers": {
              "accept": "application/json, text/javascript, /; q=0.01",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "x-requested-with": "XMLHttpRequest"
            },
            "referrer": snkrLink,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `EPrincipal=${sizeCode}&EAcessorio%5B%5D=&ECompreJunto%5B%5D=&AdicaoProdutoId=&Origem=&SiteId=106&g-recaptcha-response=`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          })
    }, snkrLink, sizeCode)
    const res = await getAddCartResponse(page)
    return res
}

const fetchTwoFactorGenerate = async(snkrLink, sizeId, cellPhone, page) => {
    page.page.evaluate( (snkrLink, sizeId, cellPhone) => {
        fetch("https://www.nike.com.br/auth/two-factor/generate", {
            "headers": {
              "accept": "application/json, text/javascript, */*; q=0.01",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "x-requested-with": "XMLHttpRequest"
            },
            "referrer": snkrLink,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `CelularCliente=${cellPhone}&ProdutoId=${sizeId}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          })
    }, snkrLink, sizeId, cellPhone)
    const res = await getTwoFactorGenerateResponse(page)
    return res
}

const fetchTwoFactorValidate = async(snkrLink, sizeId, validationCode, page) => {
    page.page.evaluate( (snkrLink, sizeId, validationCode) => {
        fetch("https://www.nike.com.br/auth/two-factor/validate", {
            "headers": {
              "accept": "application/json, text/javascript, */*; q=0.01",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "x-requested-with": "XMLHttpRequest"
            },
            "referrer": snkrLink,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `NumberCode=${validationCode}&ProdutoId=${sizeId}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          })
    }, snkrLink, sizeId, validationCode)
    const res = await getTwoFactorValidateResponse(page)
    return res
}

const getAddCartResponse = async (page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/Carrinho/Adicionar')
    return res
}

const getTwoFactorGenerateResponse = async (page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/auth/two-factor/generate')
    return res
}

const getTwoFactorValidateResponse = async(page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/auth/two-factor/validate')
    return res
}

module.exports = {
  fetchAddCart,
  fetchTwoFactorGenerate,
  fetchTwoFactorValidate
}