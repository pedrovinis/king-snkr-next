import { TASKPROGRESS } from '@lib/constants'
import cn from 'classnames'
import styles from './task-progress.module.css'

type Props = {
	progress: number
}

export default function TaskProgress({ progress }:Props) {
    const error = false
    const warn = false
    return (
        <a className={cn(styles.default, {
            [styles.inProgress]: progress,
            [styles.warn]: warn,
            [styles.error]: error
        })}>
            •{TASKPROGRESS[progress]}
        </a>
  )
}