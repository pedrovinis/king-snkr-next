import { useState } from 'react'
import { toast } from 'react-toastify'
import i18n from 'translate/i18n'
import styles from './copy-button.module.css'
import IconCopy from '../icons/copy-icon'

export default function CopyButton({value}:any) {
    const [copied, setCopied] = useState(false)
    return (
        <button 
        className={copied?  styles.copied : styles.copyButton}
        disabled={copied}
        onClick={()=>{
            toast.success('Successful copied to clipboard.')
            setCopied(true)
            navigator.clipboard.writeText(value)
            setTimeout(() => {
                setCopied(false)
              }, 2000)
        }}
        >
            {copied ? i18n.t('buttons.copied') : <>{i18n.t('buttons.copy')}<IconCopy /></>}
        </button>
    )
}
