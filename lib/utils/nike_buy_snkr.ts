export const fetchAddCart = async(snkrLink:string, sizeCode:string) => {
  const res = await fetch("https://www.nike.com.br/Carrinho/Adicionar", {
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
  const data = await res.json()
  return data
}

export const fetchTwoFactorGenerate = async(snkrLink:string, sizeId:string, cellPhone:string) => {
  const res = await fetch("https://www.nike.com.br/auth/two-factor/generate", {
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
    const data = await res.json()
    return data
}

export const fetchTwoFactorValidate = async(snkrLink:string, sizeId:string, validationCode:string) => {
  const res = await fetch("https://www.nike.com.br/auth/two-factor/validate", {
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
    const data = await res.json()
    return data
}
