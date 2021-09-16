import { configFetch } from "@lib/config-api"
import { CONFIG_OPTIONS } from "@lib/constants"
import { Config } from "@lib/types"
import router from "next/router"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import i18n from "translate/i18n"

type Props = {
    config: Config,
    setConfig: Function
    loading: boolean
    error: boolean
}

export const ConfigContext = createContext<Props>({
    config: {
        hideContent: false,
        locale: CONFIG_OPTIONS.locale[0],
        lang: i18n.language
    },
    setConfig: () => {},
    loading: false,
    error: false
})

export const ConfigProvider = ({ children, setLang }:any) => {
    const [loading, setLoading] = useState(true)
    const [config, setConfig] = useState({
        hideContent: false,
        locale: CONFIG_OPTIONS.locale[0],
        lang: i18n.language
    })
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await configFetch()
            const data = await res.json()
            setConfig({
                hideContent: data?.config?.hideContent || false,
                locale: data?.config?.locale || 'Brasil',
                lang: data?.config?.lang || i18n.language,
            })
            i18n.changeLanguage(data.config.lang || i18n.language)
            setLoading(false)
        })()
    }, [])

    useEffect( () => {
        if(!loading && config.lang) {
            i18n.changeLanguage(config.lang)
        }
    }, [config.lang])

    const value = {
        config: config,
        setConfig: setConfig,
        loading: loading,
        error: error
    }

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    )
}