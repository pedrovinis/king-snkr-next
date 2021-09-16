export const sessionFetch = async() => {
    const res = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
    })
    return res
}