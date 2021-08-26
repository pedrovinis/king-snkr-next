import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stage } from '@lib/types';
import styles from './schedule-sidebar.module.css';
import Select from './select';
import TalkCard from './schedule-card';


type Props = {
  allStages: Stage[];
};

export default function ScheduleSidebar({ allStages }: Props) {
  const router = useRouter();
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug);
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug);

  useEffect(() => {
    setCurrentStageSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Schedule</h3>
      <p>date</p>
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
        {currentStage?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
}
