export default class Page {
    constructor (browser) {
        this.options = {
            width: 1920,
            height: 1080
        }
        return (async () => {
            this.page = await browser.newPage()
            this.page.setViewport({
                width: this.options.width,
                height: this.options.height
            })
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
            await this.page.setDefaultNavigationTimeout(0)
            return this
        })()
    }
    async goto(url) {
        await this.page.goto(url)
    }

    async waitForResponse() {
        const res = await this.page.waitForResponse(res => { return res })
        res.ok()
        return res
    }

    async waitForSpecificResponse(url) {
        const res = await this.page.waitForResponse(url)
        return res
    }

    async waitFor(querySelector) {
        await this.page.waitForSelector(querySelector, {visible: true})
    }

    async setCookie(cookie={}) {
        this.page.setCookie(cookie)
    }

    async getCookies() {
        return await this.page.cookies()
    }

    url(){
        return this.page.url()
    }

    async refresh(opts) {
        await this.page.reload(opts)
    }
    
    async screenshot(path) {
        await this.page.screenshot({ path: `${path}.png` })
    }

    async type(querySelector, value) {
        await this.page.type(querySelector, value)
    }

    async click(querySelector) {
        await this.page.click(querySelector)
    }

    async close() {
        await this.page.close()
    }

    async closeNow() {
        await this.page.evaluate(() => window.stop())
        this.page.close()
    }
}