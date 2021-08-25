const fs = require('fs')

export default class Snkr {
    constructor(){
        this.snkrData = {
            name: '',
            id: '',
            slug: '',
            link: '',
            sizes: [],
            release: '',
            sale_price: ''
        }
    }

    setSnkrName(name) {
        this.snkrData['name'] = name
    }

    getSnkrName() {
        return this.snkrData['name']
    }

    setSnkrId(id) {
        this.snkrData['id'] = id
    }

    getSnkrId() {
        return this.snkrData['id']
    }

    setSnkrSlug(slug) {
        this.snkrData['slug'] = slug
    }

    getSnkrSlug() {
        return this.snkrData['slug']
    }

    setSnkrLink(link) {
        this.snkrData['link'] = link
    }

    getSnkrLink() {
        return this.snkrData['link']
    }

    setSnkrSizes(sizes=[]) {
        this.snkrData['sizes'] = sizes
    }

    getSnkrsSizes() {
        return this.snkrData['sizes']
    }

    setSnkrRelease(time) {
        this.snkrData['release'] = time
    }

    getSnkrRelease() {
        return this.snkrData['release']
    }

    setSnkrSalePrice(salePrice) {
        this.snkrData['sale_price'] = salePrice
    }

    getSnkrSalePrice() {
        return this.snkrData['sale_price']
    }

    saveConfigs() {
        fs.writeFileSync(`bin/snkrs/${this.snkrData.name}-${this.snkrData.id}-${this.snkrData.size}.json`, JSON.stringify(this.snkrData), 'utf8', ()=> {
        }) 
    }
}