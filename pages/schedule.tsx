import { GetStaticProps } from 'next';

import Page from '@components/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';

import { Stage } from '@lib/types';

type Props = {
  schedule: Stage[];
};

export default function SchedulePage({ schedule }: Props) {
  const meta = {
    title: 'pXv | Schedule',
    description: 'pXv Schedule'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allStages={schedule} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/schedule`)
  const schedule = await data.json()

  return {
    props: {
      schedule
    },
    revalidate: 60
  };
};
