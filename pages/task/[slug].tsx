import fs from 'fs'
import Page from '@components/page'
import Layout from '@components/layout'
import { Task } from '@lib/types'
import TaskSection from '@components/task-section'
import { GetServerSideProps } from 'next'
import PageContainer from '@components/page-container'
import Link from 'next/link'

type Props = {
  task?: Task | null
}

export default function UserPage({ task }: Props) {
  const meta = {
    title: `King Snkr | ${task ? task.name : 'Task Not Found'}`,
    description: 'pXv'
  }

  return (
    <Page meta={meta}>
      <Layout>
        { task ? (
          <TaskSection task={task} />
        ) : (
          <PageContainer>
          <h1> Task Not Found </h1>
          <Link href="/users"><a>Clique aqui para ver suas Tasks.</a></Link>
          </PageContainer>
        )}
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const tasksFileName = fs.readdirSync('bin/tasks')
  const tasks: Task[] = tasksFileName.map( (taskFileName) => {
    return JSON.parse(fs.readFileSync(`bin/tasks/${taskFileName}`, 'utf8'))
  })
  const task = tasks.find((s:any) => s.slug === slug) || null

  return {
    props: {
      task: task
    }
  }
}