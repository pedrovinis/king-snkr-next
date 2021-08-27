import fs from 'fs'
import Page from '@components/page'
import TasksGrid from '@components/tasks-grid'
import Header from '@components/header'
import Layout from '@components/layout'
import { GetServerSideProps } from 'next'
import { Task } from '@lib/types'
import Link from 'next/link'
import EmptyList from '@components/empty-list'

type Props = {
  tasks: Task[]
}


export default function SnkrsPage( {tasks}: Props) {
  const meta = {
    title: 'King Snkr | Tasks',
    description: 'Here you will find your programmed tasks.'
  }

  const isEmpty = !tasks

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Tasks" description={meta.description} />
        <Link href={'/addtask'}>
          <a
          className='button'
          style={{
            width:'325px',
          }}
          >
            Add Task
          </a>
        </Link>
        {isEmpty ? (
          <EmptyList list={'tasks'} buttonText={'Add Task'}/>
        ): (
          <TasksGrid tasks={tasks} />
        )}

      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const tasksFileName = fs.readdirSync('bin/tasks')
  const tasks: Task[] = tasksFileName.map( (taskFileName) => {
    return JSON.parse(fs.readFileSync(`bin/tasks/${taskFileName}`, 'utf8'))
  })

  return {
    props: {
      tasks
    }
  }
}