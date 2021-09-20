import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./auth-context"

type Props = {
    products: any
    loading: boolean
    error: boolean
}

export const UserProductsContext = createContext<Props>({
    products: {},
    loading: false,
    error: false
})

export const UserProductsProvider = ({ children }:any) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts]= useState({})
    const [error, setError] = useState(false)

    const auth = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            if(!auth.loading) {
                if(auth.session){
                    const res = await fetch(`/api/user/products`)
                    const data = await res.json()
                    setProducts(data.products? data?.products : {})
                }
                setLoading(false)
            }

        })()
    }, [auth.loading])


    const value = {
        loading: loading,
        products: products,
        error: error
    }

    return (
        <UserProductsContext.Provider value={value}>
            {children}
        </UserProductsContext.Provider>
    )
}