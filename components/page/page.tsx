import Head from 'next/head'
import { useRouter } from 'next/router'
import { SITE_URL,  } from '../../lib/constants'
import styles from './page.module.css'

type Meta = {
  title: string | null
  description: string | null
  image?: string | null
  url?: string | null
}

type Props = {
  meta: Meta
  children: React.ReactNode
  display?: string
  fullViewport?: boolean
}

const Page = ({ meta, children, display }: Props) => {
  const router = useRouter()
  const title = meta.title || `pXv | For your Life`
  const url = meta.url || `${SITE_URL}${router.asPath}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer} style={{display: display}}>
        {children}
      </div>
    </>
  )
}

export default Page