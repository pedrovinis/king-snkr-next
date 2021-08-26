import Layout from '@components/layout';
import Page from '@components/page';
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Tasks',
    description: 'pXv'
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero="Tasks" description=""/>

      </Layout>
    </Page>
  );
}
