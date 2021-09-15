export const sessionFetch = async() => {
    const res = await fetch('api/auth', {
        method: 'GET',
    })
    return res
}