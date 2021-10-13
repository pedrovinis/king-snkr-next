import cn from 'classnames'
import styles from './loading-dots.module.css'

interface Props {
  size?: number
  reverse?: boolean
  children?: React.ReactNode
}

export default function LoadingDots({ size = 5, children, reverse }: Props) {
  return (
    <span
      className={cn(styles.loading, { [styles.reverse]: reverse })}
      style={{
        ['--loading-dots-height' as string]: size+'px',
        ['--loading-dots-size' as string]: size+'px'
      }}
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  )
}
