import fs from 'fs'

import Page from '@components/page'
import Layout from '@components/layout'

import { User } from '@lib/types'
import UserSection from '@components/user-section'
import { GetServerSideProps } from 'next'
import PageContainer from '@components/page-container'
import Link from 'next/link'
import UserIcon from '@components/icons/icon-user'

type Props = {
  user?: User | null
}

export default function UserPage({ user }: Props) {
  const meta = {
    title: `King Snkr | ${user ? user?.name : 'User Not Found'}`,
    description: 'pXv'
  };

  return (
    <Page meta={meta}>
      <Layout>
        {user ? (
          <UserSection user={user} />
        ) : (
          <PageContainer>
          <h1> User Not Found </h1>
          <Link href="/users"><a>Click here to check your Users.</a></Link>
          </PageContainer>
        )}
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const usersFileName = fs.readdirSync('bin/users')
  const users: User[] = usersFileName.map( (userFileName) => {
    return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
  })
  const user = users.find((s:any) => s.slug === slug) || null;

  return {
    props: {
      user: user
    }
  }
}