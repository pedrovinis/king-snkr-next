import Image from 'next/image'
import cn from 'classnames'
import styles from './empty-grid.module.css'

function EmptyCard({number=0, card='user'}) {
  const fCard = card + 's'
  return (
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={`styles.imageWrapper`}>
          <Image
            src={`/${card}-icon.svg`}
            className={cn(styles.image)}
            loading="lazy"
            width={900}
            height={500}
          />
        </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{`${card}${number}`}</h2>
              <p className={styles.description}>{`${card}@${number*number*number}`}</p>
            </div>
          </div>
      </a>
  )
}

type Props = {
  card?: 'task' | 'user' | 'snkr' | string
  quantity?: number
}

export default function EmptyGrid({card, quantity = 10}:Props) {
  const loadCards = (q:any, card:any) => {
    let allCards = []
    for(var i=0; i<q; i++) {
      allCards.push(
      <>
        <EmptyCard key={i} number={i} card={card}/>
      </>
      )}
    return allCards
  }
  return (
    <>
      <div className={styles.grid}>
        {loadCards(quantity, card)}
      </div>
    </>
  )
}
