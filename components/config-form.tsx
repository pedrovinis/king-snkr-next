import { CONFIG_OPTIONS } from '@lib/constants'
import PageContainer from './page-container'
import { useContext, useEffect, useState } from 'react'
import LoadingDots from './loading-dots'
import ChangeWidget from './change-widget'
import styles from './config-form.module.css'
import Select from './select'
import { ConfigContext } from './config-context'
import { setConfigFetch } from '@lib/config-api'
import { toast } from 'react-toastify'
import i18n from 'translate/i18n'

export default function ConfigForm(){
  const { config, loading, setConfig } = useContext(ConfigContext)
  const [applyLoading, setApplyLoading] = useState(false)
  const [hideContent, setHideContent] = useState(config.hideContent)
  const [locale, setLocale] = useState(config.locale)
  const [language, setLanguage] = useState(config.lang)
  const [refreshState, setRefreshState] = useState(false)

  const handleConfigRes = async(res:Response, fConfig:any) => {
    const data = await res.json()
    if(data?.success) { 
      setConfig(fConfig)
      toast.success(i18n.t('config.success'))
    }
    else toast.error(i18n.t('config.error'))
  }


  useEffect(() => {
    setRefreshState(!refreshState)
  },[config.lang])

  useEffect(() => {
    setHideContent(config.hideContent)
    setLocale(config.locale)
    setLanguage(config.lang)
  },[config])

  return (
      <PageContainer>
        {loading ? (
          <LoadingDots size={15} />
        ) : (
          <>
          <div className={styles.container}>
          <h2 className={styles.text}>
            {i18n.t('config.hide_personal_content')}
          </h2>
          <ChangeWidget onChange={setHideContent} value={hideContent}/>
        </div>
        <div className={styles.container}>
          <h2 className={styles.text}>
            {i18n.t('config.locale')}
          </h2>
          <Select
          onChange={e =>{
            const localeValue = e.target.value
            setLocale(localeValue)
          }}
          >
            {CONFIG_OPTIONS.locale.map( loc => {
              return (<option key={loc} defaultChecked={loc == locale} value={loc}>
                {loc}
              </option>
              )
            })}
          </Select>
        </div>
        <div className={styles.container}>
          <h2 className={styles.text}>
            {i18n.t('config.language')}
          </h2>
          <Select
          onChange={e => {
            const langValue = e.target.value
            setLanguage(langValue)
          }}>
            {CONFIG_OPTIONS.lang.map(lang => {
              return (<option key={lang[0]} selected={lang[0] == language} value={lang[0]}>
                {lang[1]}
              </option>
              )
            })}
          </Select>
        </div>
        <button 
          className="button"
          disabled={applyLoading}
          onClick={async() => {
            setApplyLoading(true)
            const fConfig = {
              hideContent: hideContent,
              locale: locale,
              lang: language
            }
            const res = await setConfigFetch(fConfig)
            handleConfigRes(res, fConfig)
            setApplyLoading(false)
          }}
        >
          {applyLoading ? <LoadingDots size={5} /> : <>{i18n.t('config.apply')}</>}
        </button>
        </>
        )}
        
      </PageContainer>
    )
}