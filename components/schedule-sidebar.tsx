import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Stage } from '@lib/types'
import styles from './schedule-sidebar.module.css'
import Select from './select'
import ScheduleCard from './schedule-card'


type Props = {
  allStages: Stage[]
}

export default function ScheduleSidebar({ allStages }: Props) {
  const router = useRouter()
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug)
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug)

  useEffect(() => {
    setCurrentStageSlug(router.query.slug)
  }, [router.query.slug])

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Filter</h3>
      <p>By Date</p>
      <Select
        aria-label="Select a stage"
        value={currentStageSlug}
        onChange={e => {
          const slug = e.target.value;
          setCurrentStageSlug(slug);
        }}
      >
        {allStages.map(stage => (
          <option key={stage.slug} value={stage.slug}>
            {stage.name}
          </option>
        ))}
      </Select>
      <div className={styles.talks}>
        {currentStage?.schedule.map(snkr => (
          <ScheduleCard key={snkr.name} snkr={snkr} showTime />
        ))}
      </div>
    </div>
  );
}
