import Page from '@components/page/page'
import IconLogo from '@components/icons/logo-icon'
import Link from 'next/link'

export default function Conf() {
  const meta = {
    title: 'pXv | 404',
    description: 'pXv 404'
  }


  return (
    <Page meta={meta} fullViewport>
          <span style={{display:'flex', margin:'2rem auto', justifyContent:'center'}}><IconLogo size={'100'}/></span>
          <h1 style={{textAlign:'center'}}> 404 Página não encontrada.</h1>
          <Link href={'/'}><a style={{display:'flex', justifyContent:'center', margin:'1rem 0'}}>Página incial</a></Link> 
    </Page>
  )
}
