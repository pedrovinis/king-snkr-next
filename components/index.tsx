import { useContext } from 'react'
import Hero from './hero'
import cn from 'classnames'
import styleUtils from './utils.module.css'
import styles from './index.module.css'

import Profile from '@components/profile'

import LearnMore from './learn-more'
import LoginButton from './login-button'
import { AuthContext } from './auth-context'
import LoadingDots from './loading-dots'


export default function Index() {
  const { loading, session } = useContext(AuthContext)

  return (
        <>
          <Hero />
          <span className={cn(styleUtils.appear, styles.info,
              [styleUtils['appear-fourth']],
          )}>
          {loading ? (
            <LoadingDots size={15} />
          ) : (
            <>
            {session ? (
              <Profile user={session?.user}/>
            ) : (
              <LoginButton />
            )}
            </>
          )}
        </span>
        <LearnMore />
        </>
  )
}
