import { createContext, useEffect } from "react"

type Props = {
    session?: object
}

export const AuthContext = createContext<Props>({})

export const AuthProvider = ({ children }:any) => {
    useEffect(() => {
        console.log('Auth provider')
    }, [])

    const user = 'pedro'
    const value = {session: {}}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}