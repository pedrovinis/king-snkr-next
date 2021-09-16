import { payLoadsFecth } from "@lib/kingsnkr-api"
import payloads from "pages/api/kingsnkr/payloads"
import { UserProductsContext } from '@components/user-products-context'
import { createContext, useContext, useEffect, useState } from "react"
import { isActive } from "@lib/isActive"

type Props = {
    payloads: any
    loading: boolean
    error: boolean
}

export const PayLoadsContext = createContext<Props>({
    payloads: {},
    loading: false,
    error: false
})

export const PayLoadsProvider = ({ children }:any) => {
    const { products } = useContext(UserProductsContext)
    const [loading, setLoading] = useState(true)
    const [payloads, setPayloads] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            if(isActive(products['king-snkr']?.expiration)){
                const res = await payLoadsFecth()
                const data = await res.json()
                setPayloads(data.payloads)
                setLoading(false)
            }
        })()
    }, [products['king-snkr']?.expiration])


    const value = {
        payloads: payloads,
        loading: loading,
        error: error
    }

    return (
        <PayLoadsContext.Provider value={value}>
            {children}
        </PayLoadsContext.Provider>
    )
}