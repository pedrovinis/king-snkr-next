import { useContext } from 'react'
import Layout from './layout'
import Hero from './hero'
import cn from 'classnames'
import styleUtils from './utils.module.css'
import styles from './index.module.css'

import Profile from '@components/profile'

import LearnMore from './learn-more'
import LoginButton from './login-button'
import { AuthContext } from './auth-context'
import LoadingDots from './loading-dots'
import PageContainer from './page-container'


export default function Index() {
  const { session, loading } = useContext(AuthContext)

  return (
      <Layout>
        <PageContainer >
              <Hero />
              <span className={cn(styleUtils.appear, styles.info,
                  [styleUtils['appear-fourth']],
              )}>
              {!loading ? (
                <LoadingDots size={20} />
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
        </PageContainer>
      </Layout>
  )
}
