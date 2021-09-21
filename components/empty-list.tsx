
import styles from './empty-list.module.css'
import PageContainer from './page-container'

type Props = {
  list: 'task' | 'user' | 'snkr'
  buttonText: string
}

export default function EmptyList({list, buttonText}:Props) {
    
    return (
        <PageContainer >
        <div className={styles.message}>
            You have no {list+'s'} yet, please click on
            <a style={{color:'var(--brand)'}}> {buttonText} </a>
            to add.
        </div>
        </PageContainer>
  )
}
