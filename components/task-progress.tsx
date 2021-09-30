import { TASK_PROGRESS } from '@lib/constants'
import cn from 'classnames'
import styles from './task-progress.module.css'

type Props = {
	progress: number
}

export default function TaskProgress({ progress }:Props) {
    const error = false
    const warn = progress != 0 && progress != TASK_PROGRESS.length - 1
    return (
        <a className={cn(styles.default, {
            [styles.inProgress]: progress,
            [styles.warn]: warn,
            [styles.error]: error
        })}>
            •{TASK_PROGRESS[progress]}
        </a>
  )
}