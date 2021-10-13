import Head from 'next/head'
import styles from './page.module.css'

type Meta = {
  title: string | null
}

type Props = {
  meta: Meta
  children: React.ReactNode
  display?: string
}

const Page = ({ meta, children, display }: Props) => {
  const title = meta.title || `pXv | For your Life`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.pageContainer} style={{display: display}}>
        {children}
      </div>
    </>
  )
}

export default Page