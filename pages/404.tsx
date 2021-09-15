import Page from '@components/page'
import Layout from '@components/layout'
import PageContainer from '@components/page-container';
import IconLogo from '@components/icons/icon-logo';
import Link from 'next/link';

export default function Conf() {
  const meta = {
    title: 'pXv | 404',
    description: 'pXv 404'
  }


  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <PageContainer>
          <span style={{display:'flex', margin:'2rem auto', justifyContent:'center'}}><IconLogo size={'100'}/></span>
          <h1 style={{textAlign:'center'}}> 404 Página não encontrada.</h1>
          <Link href={'/'}><a style={{display:'flex', justifyContent:'center', margin:'1rem 0'}}>Página incial</a></Link> 
        </PageContainer>
      </Layout>
    </Page>
  )
}
