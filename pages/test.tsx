import Layout from '@components/layout';
import Page from '@components/page';
import useSWR from 'swr';

export default function Conf() {
  const meta = {
    title: 'King Snkr | pXv',
    description: 'pXv'
  }

  


  return (
    <Layout >
        <Page meta={meta} fullViewport>
            
        </Page>
    </Layout>

  )
}
