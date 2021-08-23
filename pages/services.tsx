import { GetStaticProps } from 'next';

import Page from '@components/page';
import ServicesGrid from '@components/services-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { Service } from '@lib/types';

type Props = {
  services: Service[];
}

export default function Jobs({ services }: Props) {
  const meta = {
    title: 'King Snkr | Services',
    description: ''
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Services" description={meta.description} />
        <ServicesGrid services={services} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(`https://pxv.vercel.app/api/services`)
  const services = await data.json()

  return {
    props: {
      services
    },
    revalidate: 60
  };
};
