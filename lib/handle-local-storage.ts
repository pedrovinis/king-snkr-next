//@ts-ignore
import randomToken from 'random-token'

export const handleKingSnkrId = (localStorage:any) => {
    const id = localStorage['king_snkr_id']
    if(!id || id.length < 50) {
        const newId = randomToken(50)
        localStorage.setItem('king_snkr_id', newId)
    }
}

export const getKingSnkrId = (localStorage:any) => {
    return localStorage.getItem(['king_snkr_id'])
}