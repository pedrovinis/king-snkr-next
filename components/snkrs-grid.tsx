import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import IconSnkr from '@components/icons/icon-snkrs'
import { Snkr } from '@lib/types'
import styles from './snkrs-grid.module.css'
import SnkrIcon from '@components/icons/icon-snkrs'

function SnkrCard({ snkr }: { snkr: Snkr }) {
  return (
    <Link key={snkr.name} href={`/snkr/${snkr.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
          {/* <Image
            alt={snkr.name}
            src={'/snkr-icon.svg'}
            className={cn(styles.image)}
            loading="lazy"
            title={snkr.name}
            width={900}
            height={500}
          /> */}
          <SnkrIcon snkrName={snkr.name}/>
        </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{snkr.name} {snkr.edition}</h2>
            </div>
            <p className={styles.description}>{`R$ ${snkr.sale_price}`}</p>
          </div>
      </a>
    </Link>
  );
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
