import { GetStaticProps } from 'next';

import Page from '@components/page';
import SponsorsGrid from '@components/sponsors-grid';
import Header from '@components/header';
import Layout from '@components/layout';

import { Sponsor } from '@lib/types';

type Props = {
  products: Sponsor[];
};

export default function ExpoPage({ products }: Props) {
  const meta = {
    title: 'pXv | Products',
    description: 'Here you are going to find pXv official products to buy.'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Products" description={meta.description} />
        <SponsorsGrid sponsors={products} />
      </Layout>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(`${process.env.BASE_URL}/api/products`)
  const products = await data.json()

  return {
    props: {
      products
    },
    revalidate: 60
  };
};
