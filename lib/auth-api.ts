export const sessionFetch = async() => {
    const res = await fetch('api/snkr/add', {
        method:'POST',
    })
    return res
}