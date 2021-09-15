import { sessionFetch } from "@lib/auth-api"
import { createContext, useEffect, useState } from "react"

type Props = {
    session: sessionProps
    loading: boolean
    error: boolean
}

type sessionProps = {
    user?: userProps
}

type userProps = {
    name?: string
    email?: string
}

export const AuthContext = createContext<Props>({
    session: {},
    loading: false,
    error: false
})

export const AuthProvider = ({ children }:any) => {
    const [loading, setLoading] = useState(true)
    const [session, setSession]= useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await sessionFetch()
            const data = await res.json()
            const session = data.session
            setSession(session || {})
            setLoading(false)
        })()

    }, [])


    const value = {
        loading: loading,
        session: session,
        error: error
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}