import fs from 'fs'
import Page from '@components/page'
import UsersGrid from '@components/users-grid'
import Header from '@components/header'
import Layout from '@components/layout'

import { GetServerSideProps } from 'next'
import { User } from '@lib/types'
import Link from 'next/link'

type Props = {
  users: User[]
}


export default function ExpoPage( {users}: Props) {
  const meta = {
    title: 'pXv | Users',
    description: 'Here you will find your nike users.'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Users" description={meta.description} />
        <Link href={'/adduser'}>
          <a
          className='button'
          style={{
            width:'325px',
          }}
          >
            Add user
          </a>
        </Link>
        <UsersGrid users={users} />
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const usersFileName = fs.readdirSync('bin/users')
  const users: User[] = usersFileName.map( (userFileName) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
  })

  return {
    props: {
      users
    }
  }
}