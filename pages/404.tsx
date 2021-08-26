import Layout from '@components/layout';
import Page from '@components/page';
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | pXv',
    description: 'pXv'
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero="Page not Found" description=""/>

      </Layout>
    </Page>
  );
}
