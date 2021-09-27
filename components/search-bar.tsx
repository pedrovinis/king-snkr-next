import cn from 'classnames'
import { useState } from 'react'
import SearchIcon from './icons/icon-search'
import XIcon from './icons/icon-x'
import styles from './search-bar.module.css'

type Props = {
  value: string,
  setValue: Function
}

export default function SearchBar({value, setValue}: Props) {
    const [focused, setFocused] = useState(false)

    return (
      <div className={styles.wrapper}>
          <div className={styles.searchBar}>
              <input 
              maxLength={50}
              spellCheck={false}
              autoComplete="off"
              className={cn(styles.searchQueryInput, {
                  [styles.focused]: focused
              })}
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={value}
              />
              <button 
              className={styles.searchQuerySubmit} 
              name="searchQuerySubmit"
              onClick={()=> {
                if(value.length) setValue('')
              }}
              >
              {value.length ? 
              <XIcon fill={'var(--accents-1)'}/>
              : 
              <SearchIcon fill={'var(--accents-1)'}/>}
              </button>
          </div>
      </div>
  )
}
