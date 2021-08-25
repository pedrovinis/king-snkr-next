import Page from '@lib/class/page'

const gotoSnkrPage = async(link, page) => {
    await page.goto(link)
}

export const getAndFormatSnkrData = async(browser, link) => {
    const page = await new Page(browser.getBrowser())
    gotoSnkrPage(link, page)

    const resDataLayer = await getSnkrDataLayerResponse(page)
    const resAjax = await getSnkrAjaxResponse(page)
    const sizesInfo = await getSnkrSizesInfo(page)
    const edition = await getEdition(page)

    const formatedDataLayer =  await formatSnkrDataLayerResponse(resDataLayer)
    const formatedAjax = await formatSnkrAjaxResponse(resAjax)

    await page.closeNow()

    return {
        snkr_name: formatedDataLayer.snkr_name,
        snkr_edition: edition,
        snkr_id: formatedDataLayer.snkr_id,
        snkr_sale_price: formatedDataLayer.snkr_sale_price,
        snkr_release: formatedAjax.snkr_release,
        sizes: sizesInfo
    }
}

const getSnkrDataLayerResponse = async(page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/DataLayer/dataLayer')
    return res
}

const formatSnkrDataLayerResponse = async(dataLayerResponse) => {
    const data = await dataLayerResponse.json()
    return { 
        snkr_name: data.productInfo.name,
        snkr_id: data.productInfo.productId,
        snkr_sale_price: data.productInfo.salePrice
    }
}

const getSnkrAjaxResponse = async (page) => {
    const res = await page.waitForSpecificResponse('https://www.nike.com.br/Requisicao/Ajax')
    return res
}

const formatSnkrAjaxResponse = async(ajaxResponse) => {
    const data = await ajaxResponse.json()
    const countDown = getCountDown(data.DetalheProduto)
    const timeNow = data.Hora
    const release = timeNow + countDown
    return {
        snkr_release: release
    }
}

const getEdition = async(page) => {
    await page.waitFor('[class=nome-preco-produto]')
    const editionDiv = await page.page.evaluate( () => { 
        const div = document.querySelector('[class=nome-preco-produto]').outerHTML
        return div
    })
    const startPoint = editionDiv.search('<br>') + 4
    const endPoint = editionDiv.search('</a>')
    
    return editionDiv.slice(startPoint, endPoint).trim()
}

const getCountDown = (detalheProduto) => {
    const startPoint = detalheProduto.search('countDown') + 11
    const endPoint = detalheProduto.search(',')

    return parseInt(detalheProduto.slice(startPoint, endPoint))
}

const getSnkrSizesInfo = async(page) => {
    const sizesInfo = await page.page.evaluate( () => {
        const sizesInfo = window['SKUsCorTamanho']
        return sizesInfo
    })

    return sizesInfo
}