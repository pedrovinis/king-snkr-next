import Link from 'next/link'
import cn from 'classnames'
import { Snkr } from '@lib/types'
import styles from './snkrs-grid.module.css'
import SnkrIcon from '@components/icons/icon-snkr'

function SnkrCard({ snkr }: { snkr: Snkr }) {
  return (
    <Link key={snkr.name} href={`/snkr/${snkr.slug}`}>
      <div
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
          <SnkrIcon snkrName={snkr.name} />
        </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{snkr.name} <a className={styles.edition}>{snkr.edition}</a></h2>
            </div>
            <p className={styles.description}>{`R$ ${snkr.sale_price}`}</p>
          </div>
      </div>
    </Link>
  )
}

type Props = {
  snkrs: Snkr[]
}

export default function SnkrsGrid({ snkrs }: Props) {
  return (
    <>
      <div className={styles.grid}>
        {snkrs.map(snkr => <SnkrCard key={snkr.name} snkr={snkr} /> )}
      </div>
    </>
  )
}
