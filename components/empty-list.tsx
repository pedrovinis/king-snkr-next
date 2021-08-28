
import styles from './empty-list.module.css'
import EmptyGrid from './empty-grid'

type Props = {
  list: 'task' | 'user' | 'snkr'
  buttonText: string
}

export default function EmptyList({list, buttonText}:Props) {
    
    return (
        <>
        <div className={styles.message}>
            You have no {list+'s'} yet, please click on
            <a style={{color:'var(--brand)'}}> {buttonText} </a>
            to add.
        </div>
        <EmptyGrid card={list} />
        </>
  )
}
