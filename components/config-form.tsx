import { Config } from '@lib/types'
import { CONFIG_OPTIONS } from '@lib/constants'
import PageContainer from './page-container'
import { useState } from 'react'
import LoadingDots from './loading-dots'
import ChangeWidget from './change-widget'
import styles from './config-form.module.css'
import Select from './select'

type FormState = 'default' | 'loading' | 'error'

type Props = {
  config: Config | null
}

export default function ConfigForm({config}: Props) {
  const [applyLoading, setApplyLoading] = useState(false)

  return (
      <PageContainer>
        <div className={styles.container}>
          <h2 className={styles.text}>
            Hide Personal Content
          </h2>
          <ChangeWidget />
        </div>
        <div className={styles.container}>
          <h2 className={styles.text}>
            Locale
          </h2>
          <Select>
            {CONFIG_OPTIONS.locale.map( locale => {
              return (<option key={locale}>
                {locale}
              </option>
              )
            })}
          </Select>
        </div>
        <div className={styles.container}>
          <h2 className={styles.text}>
            Language
          </h2>
          <Select>
            {CONFIG_OPTIONS.lang.map( locale => {
              return (<option key={locale[0]}>
                {locale[1]}
              </option>
              )
            })}
          </Select>
        </div>
        <button 
          className="button"
          disabled={applyLoading}
          onClick={ () => {
            setApplyLoading(true)
          }}
        >
          {applyLoading ? <LoadingDots size={6} /> : <>Apply</>}
        </button>
      </PageContainer>
    )
}

