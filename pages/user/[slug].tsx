import fs from 'fs'

import Page from '@components/page/page'
import { User } from '@lib/types'
import UserSection from '@components/user-section'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

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
        {user ? (
          <UserSection user={user} />
        ) : (
          <>
          <h1> User Not Found </h1>
          <Link href="/users"><a>Click here to check your Users.</a></Link>
          </>
        )}
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