import { useState } from 'react'
import { toast } from 'react-toastify'
import styles from './copy-button.module.css'

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
        }}
        >
            {copied ? <>Copied</> : <>Copy</>}
        </button>
    )
}
