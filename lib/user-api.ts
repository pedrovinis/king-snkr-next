import { User } from "./types"

export const addUserFetch = async(user:any) => {
    const res = await fetch('api/user/add', {
        method:'POST',
        body: btoa(JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password
        }))
    })
    return res
}

export const deleteUserFetch = async(user:User) => {
    const res = await fetch('/api/user/delete', {
        method:'POST',
        body: btoa(JSON.stringify({
            name: user.name
        }))
    })
    return res
}