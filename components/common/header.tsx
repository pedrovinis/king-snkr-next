import styles from './header.module.css'

type Props = {
  title?: string
  description?: string
}

export default function Header({title, description} : Props) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
