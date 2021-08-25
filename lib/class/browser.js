const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

export default class Browser  {
    constructor(cfg = {headless: true}) {
        const args = [
            '--Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
            '--window-size=1920,1080'
        ]
        this.options = {
            args,
            headless: cfg.headless,
            defaultViewport: null
        }
        return (async () => {
            await this.startBrowser()
            return this
        })()
    }

    async startBrowser() {
        this.browser = await puppeteer.launch(this.options)
    }

    getBrowser() {
        return this.browser
    }

    async closeBrowser() {
        await this.browser.close()
    }
}