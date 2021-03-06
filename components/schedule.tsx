import cn from 'classnames'
import { Stage } from '@lib/types'
import styles from './schedule.module.css'
import ScheduleCard from './schedule-card'

function StageRow({ stage }: { stage: Stage }) {
  return (
    <div key={stage.name} className={styles.row}>
      <h3 className={cn(styles['stage-name'], styles[stage.slug])}>
        <span>{stage.name}</span>
      </h3>
      <div className={cn(styles.talks, styles[stage.slug])}>
        {stage.schedule.map( snkr => {
          return <ScheduleCard key={snkr.id} snkr={snkr} showTime={true}/>
        })}
      </div>
    </div>
  )
}

type Props = {
  allStages: Stage[]
}

export default function Schedule({ allStages }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles['row-wrapper']}>
        {allStages.map(stage => (
          <StageRow key={stage.name} stage={stage} /> 
        ))}
      </div>
    </div>
  );
}
