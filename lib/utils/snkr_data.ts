interface iDataLayer {
    snkr_name: string
    snkr_id: string
    snkr_sale_price: string
}

export const getAndFormatSnkrData = async(link:string) => {
    const res = await fetch(link, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.nike.com.br/snkrs",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })
    const data = await res.text()
    
    const DataLayer:iDataLayer = await getAndFormatSnkrDataLayer(link)
    const sizesInfo:object = await getSizesInfo(data)
    const edition:string = await getEdition(data)

    return {
        snkr_name: DataLayer.snkr_name,
        snkr_edition: edition,
        snkr_id: DataLayer.snkr_id,
        snkr_sale_price: DataLayer.snkr_sale_price,
        //@ts-ignore
        sizes: sizesInfo,
        snkr_release: getRelease(sizesInfo),
    }
}

const getAndFormatSnkrDataLayer = async(snkrLink:string) => {
    const pathName = snkrLink.split(`https://www.nike.com.br`).pop()
    const res = await fetch("https://www.nike.com.br/DataLayer/dataLayer", {
        "headers": {
          "accept": "*/*",
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
        "body": `pageType=Snkrs&actionType=Produto&pathname=${pathName}&referrer=https%3A%2F%2Fwww.nike.com.br%2Fsnkrs`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      })
    const data:any = await res.json()

    return { 
        snkr_name: data.productInfo.name,
        snkr_id: data.productInfo.productId,
        snkr_sale_price: data.productInfo.salePrice
    }
}

const getEdition = (data:string) => {
    const start = data.search('class="nome-preco-produto"')+27
    const startSliced = data.slice(start, data.length)
    const editionStart = startSliced.search('<br>')+4
    const editionEnd = startSliced.search('</a>')

    const edition = startSliced.slice(editionStart, editionEnd)
    return edition
}

const getSizesInfo = async(data:string) => {
    const start = data.search('var SKUsCorTamanho = ')+21
    const slicedStart = data.slice(start, data.length)
    const end = slicedStart.search(`}}`)+2
    const info = slicedStart.slice(0, end)
    const jsonInfo = JSON.parse(info)

    return jsonInfo
}

const getRelease = (data:any) => {
    const sizes = Object.keys(data)
    const dateString = data[sizes[0]].DtLancto
    const day = dateString.slice(0,2)
    const month = parseInt(dateString.slice(3,5)) - 1
    const year = dateString.slice(6,10)
    const hour = dateString.slice(11,13)
    const minute = dateString.slice(14,16)
    const second = dateString.slice(17,19)

    const release = new Date(
        year,
        month,
        day,
        hour,
        minute,
        second,
        0
    )
    
    //@ts-ignore
    return parseInt(release.getTime()/1000)
}