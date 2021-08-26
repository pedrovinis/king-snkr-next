import cn from 'classnames'
import { Snkr, Stage, Talk } from '@lib/types'
import styles from './schedule.module.css'
import ScheduleCard from './schedule-card'

function StageRow({ stage }: { stage: Stage }) {
  // Group talks by the time block
  const timeBlocks = stage.schedule.reduce((allBlocks: any, snkr) => {
    allBlocks[snkr.release] = [...(allBlocks[snkr.release] || []), snkr];
    return allBlocks;
  }, {});

  return (
    <div key={stage.name} className={styles.row}>
      <h3 className={cn(styles['stage-name'], styles[stage.slug])}>
        <span>{stage.name}</span>
      </h3>
      <div className={cn(styles.talks, styles[stage.slug])}>
        {Object.keys(timeBlocks).map((startTime: string) => (
          <div key={startTime}>
            {timeBlocks[startTime].map((snkr: Snkr, index: number) => (
              <ScheduleCard key={snkr.id} snkr={snkr} showTime={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  allStages: Stage[]
}

export default function Schedule({ allStages }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles['row-wrapper']}>
        {allStages.map(stage => (
          <StageRow key={stage.slug} stage={stage} />
        ))}
      </div>
    </div>
  );
}
