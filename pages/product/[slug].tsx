import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import SponsorSection from '@components/sponsor-section';
import Layout from '@components/layout';
import { Sponsor } from '@lib/types';
 
type Props = {
  product: Sponsor;
};

export default function SponsorPage({ product }: Props) {
  const meta = {
    title: `King Snkr | ${product.name}`,
    description: 'desc'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <SponsorSection sponsor={product} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const data = await fetch(`https://pxv.vercel.app/api/products`)
  const products = await data.json()
  const product = products.find((s: any) => s.slug === slug) || null;

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`https://pxv.vercel.app/api/products`)
  const products = await data.json()
  const slugs = products.map((s: any) => ({ params: { slug: s.slug } }))

  return {
    paths: slugs,
    fallback: 'blocking'
  };
};
