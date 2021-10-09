import fs from 'fs'
import Page from '@components/page/page'
import AddTaskForm from '@components/add-task-form'
import Header from '@components/header'
import { User, Snkr } from '@lib/types'
import { GetServerSideProps } from 'next'

type Props = {
  users: User[]
  snkrs: Snkr[]
}

export default function AddTask({users, snkrs}:Props) {
  const meta = {
    title: 'King Snkr | Add Task',
    description: 'Add a nike User.'
  };

  return (
    <Page meta={meta} fullViewport>
        <Header hero="Add Task" description={meta.description}/>
        <AddTaskForm users={users} snkrs={snkrs}/>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const usersFileName = fs.readdirSync('bin/users')
  const users: User[] = usersFileName.map( (userFileName) => {
    return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
  })
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })

  return {
    props: {
      users,
      snkrs
    }
  }
}