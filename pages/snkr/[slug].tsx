import fs from 'fs'
import Page from '@components/page'
import Layout from '@components/layout'
import { Snkr } from '@lib/types'
import SnkrSection from '@components/snkr-section'
import { GetServerSideProps } from 'next'

type Props = {
  snkr: Snkr
}

export default function SnkrPage({ snkr }: Props) {
  const meta = {
    title: `King Snkr | ${snkr.name}`,
    description: 'META_DESCRIPTION'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <SnkrSection snkr={snkr} />
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })
  const snkr = snkrs.find((s:any) => s.slug === slug) || null;

  if (!snkr) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      snkr: snkr
    }
  }
}