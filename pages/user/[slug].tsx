import fs from 'fs'

import Page from '@components/page'
import Layout from '@components/layout'

import { User } from '@lib/types'
import UserSection from '@components/user-section'
import { GetServerSideProps } from 'next'

type Props = {
  user: User
}

export default function UserPage({ user }: Props) {
  const meta = {
    title: `King Snkr | ${user.name}`,
    description: 'pXv'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <UserSection user={user} />
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const usersFileName = fs.readdirSync('bin/users')
  const users: User[] = usersFileName.map( (userFileName) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
  })
  const user = users.find((s:any) => s.slug === slug) || null;

  if (!user) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      user: user
    }
  }
}