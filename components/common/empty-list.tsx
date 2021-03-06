
import styles from './empty-list.module.css'

type Props = {
  list: 'task' | 'user' | 'sneaker'
  buttonText?: string
}

export default function EmptyList({list, buttonText}:Props) {
    
    return (
        <div className={styles.message}>
            You have no {list+'s'} yet, please click on
            <a style={{color:'var(--brand)'}}> {buttonText} </a>
            to add.
        </div>
  )
}
