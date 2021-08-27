
import styles from './empty-list.module.css'
import EmptyGrid from './empty-grid'

type Props = {
  list: 'tasks' | 'users' | 'snkrs'
  buttonText: string
}

export default function EmptyList({list, buttonText}:Props) {
    const card:string = list.toLowerCase().slice(0, list.length-1)
    return (
        <>
        <div className={styles.message}>
            You have no {list} yet, please click on
            <a style={{color:'var(--brand)'}}> {buttonText} </a>
            to add.
        </div>
        <EmptyGrid card={card} />
        </>
  )
}
