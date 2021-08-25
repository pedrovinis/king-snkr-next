import Browser from '@lib/class/browser'
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

    const formatedDataLayer =  await formatSnkrDataLayerResponse(resDataLayer)
    const formatedAjax = await formatSnkrAjaxResponse(resAjax)

    return {
        snkr_name: formatedDataLayer.snkr_name,
        snkr_id: formatedDataLayer.snkr_id,
        snkr_sale_price: formatedDataLayer.snkr_sale_price,
        snkr_release: formatedAjax.snkr_release,
        sizes: sizesInfo
    }
}

const getSnkrPageResponse = async(page, link) => {
    const res = await page.waitForSpecificResponse()
    return res
}

const formatSnkrPageResponse = async(snkrPageResponse) => {
    const data = await snkrPageResponse.body
    console.log(data)
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