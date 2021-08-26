import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './copy-button.module.css'
import IconCopy from './icons/icon-copy'

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
            {copied ? <>Copied!</> : <>Copy<IconCopy /></>}
        </button>
    )
}
