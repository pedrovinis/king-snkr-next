const fs = require('fs')

export default class Task {
    constructor(){
        this.taskData = {
            name: '',
            slug: '',
            user: '',
            snkr: '',
            active: false,
            progress: 0,
            cfg: {
                size: ''
            }
        }
        this.active = undefined
    }

    setName(name) {
        this.taskData['name'] = name
    }

    getName() {
        return this.taskData['name']
    }

    setSlug(slug) {
        this.taskData['slug'] = slug
    }

    getSlug() {
        return this.taskData['slug']
    }

    setUser(user) {
        this.taskData['user'] = user
    }

    getUser() {
        return this.taskData['user']
    }

    setSnkr(snkr) {
        this.taskData['snkr'] = snkr
    }

    getSnkr() {
        return this.taskData['snkr']
    }

    setActive(active=false) {
        this.taskData['active'] = active
    }

    getActive() {
        return this.taskData['active']
    }

    setProgress(progress=0) {
        this.taskData['progress'] = progress
    }

    getProgress() {
        return this.taskData['progress']
    }

    setSize(size) {
        this.taskData['cfg']['size'] = size
    }

    getSize() {
        return this.taskData['cfg']['size']
    }

    saveConfigs() {
        fs.writeFileSync(`bin/tasks/${this.taskData.name}.json`, JSON.stringify(this.taskData), 'utf8', ()=> {
        }) 
    }
}