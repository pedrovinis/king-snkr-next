import fs from 'fs'
import Page from '@components/page'
import UsersGrid from '@components/users-grid'
import Header from '@components/header'
import Layout from '@components/layout'
import EmptyGrid from '@components/empty-grid'
import { GetServerSideProps } from 'next'
import { User } from '@lib/types'
import Link from 'next/link'
import EmptyList from '@components/empty-list'

type Props = {
  users: User[]
}

export default function UsersPage( {users}: Props) {
  const meta = {
    title: 'King Snkr | Users',
    description: 'Here you will find your Nike Users.'
  }

  const isEmpty = !users.length

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Users" description={meta.description} />
        <Link href={'/adduser'} >
          <button
          className='button'
          >
            Add User
          </button>
        </Link>
        {isEmpty ? (
          <EmptyList list={'user'} buttonText={'Add User'}/>
        )
        :(
          <UsersGrid users={users} />
        )}
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const usersFileName = fs.readdirSync('bin/users')
  const users: User[] = usersFileName.map( (userFileName) => {
    return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
  })

  return {
    props: {
      users
    }
  }
}