import Link from 'next/link'
import cn from 'classnames'
import { Snkr } from '@lib/types'
import styles from './snkrs-grid.module.css'
import SnkrIcon from '@components/icons/snkr-icon'
import SearchBar from './search-bar'
import { ReactElement, useState } from 'react'
import PageContainer from './page-container'

function SnkrCard({ snkr }: { snkr: Snkr }) {
  return (
    <Link key={snkr.name} href={`/sneaker/${snkr.slug}`}>
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
  const [searchValue, setSearchValue] = useState("")
  const fSearchValue:string = searchValue.toUpperCase().replace(/\s/g, '').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

  const filtredSNKRS:ReactElement[] = []

  snkrs.map(snkr => {
    const fSnkrName = (snkr.name+snkr.edition).toUpperCase().replace(/\s/g, '')
    if(fSnkrName.search(fSearchValue)>=0) {
      filtredSNKRS.push(<SnkrCard key={snkr.name+snkr.edition} snkr={snkr} />)
    }
  })

  return (
    <>
      {snkrs.length > 1 ? <SearchBar value={searchValue} setValue={setSearchValue}/> : ''}
        {filtredSNKRS.length ? (
        <div className={styles.grid}>
          {filtredSNKRS}
        </div>
        ) : (
            <div className={styles.notFoundMessage}>
            There are no SNKRS that match
            <a style={{color:'var(--brand)'}}> "{searchValue}" </a>
          </div>
        )}
    </>
  )
}
