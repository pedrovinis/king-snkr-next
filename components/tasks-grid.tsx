import Link from 'next/link'
import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import TaskIcon from '@components/icons/icon-task'
import IconAvatar from './icons/icon-avatar'

function TaskCard({ task }: { task: Task }) {
  return (
    <Link key={task.name} href={`/task/${task.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
        <TaskIcon size={'25'}/>
        </div>
          <div className={styles.cardBody}>
            <div>
              <h3 className={styles.name}><a className={styles.edition}>{task.name}</a></h3>
              <h3 className={styles.name}>{task.snkr.name} {task.snkr.edition} - {task.cfg.size}</h3>
            </div>
            <h4 className={styles.description}>{task.user.name} - {task.user.email}</h4>
          </div>
      </a>
    </Link>
  )
}

type Props = {
  tasks: Task[]
}

export default function TasksGrid({ tasks }: Props) {
  return (
    <>
      <div className={styles.grid}>
        {tasks.map(task => <TaskCard key={task.name} task={task} /> )}
      </div>
    </>
  )
}
