import { GetServerSideProps, GetStaticProps } from 'next';

import Page from '@components/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';

import { Stage } from '@lib/types';

type Props = {
  schedule: Stage[]
}

export default function SchedulePage({ schedule }: Props) {
  const meta = {
    title: 'King Snkr | Schedule',
    description: 'Snkrs added schedule, to add a snkr go to "SNKRS" and click on "Add Snkr".'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allStages={schedule} />
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`http://localhost:3000/api/schedule`)
  const schedule = await data.json()
  return {
    props: {
      schedule
    }
  }
}
