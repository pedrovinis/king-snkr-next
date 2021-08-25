const fs = require('fs')

export default class User {
    constructor(){
        this.userData = {
            name: '',
            email: '',
            slug: '',
            password: '',
            phone: '',
            created_at: '',
            authCookie: '',
            authCookieCreatedAt: '',
        }
    }

    setiauthCookie(token) {
        this.userData['authCookie'] = token
    }

    getauthCookie() {
        return this.userData['authCookie']
    }

    setauthCookieCreatedAt(creation) {
        this.userData['authCookieCreatedAt'] = creation
    }

    getauthCookieCreatedAt() {
        return this.userData['authCookieCreatedAt']
    }

    setName(name) {
        this.userData['name'] = name
    }

    getName() {
        return this.userData['name']
    }

    setNikeEmail(email) {
        this.userData['email'] = email
    }

    getNikeEmail() {
        return this.userData['email']
    }

    setSlug(slug) {
        this.userData['slug'] = slug
    }

    getSlug() {
        return this.userData['slug']
    }
    
    setNikePassword(password) {
        this.userData['password'] = password
    }

    getNikePassword() {
        return this.userData['password']
    }

    setNikePhone(phoneNumber) {
        this.userData['phone'] = phoneNumber
    }

    getNikePhone() {
        return this.userData['phone']
    }

    setCreatedAt(createdAt) {
        this.userData['created_at'] = createdAt
    }

    getCreatedAt() {
        return this.userData['created_at']
    }

    saveConfigs() {
        fs.writeFileSync(`bin/users/${this.userData.name}.json`, JSON.stringify(this.userData), 'utf8', ()=> {
        }) 
    }
}