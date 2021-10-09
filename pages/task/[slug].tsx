import fs from 'fs'
import Page from '@components/page/page'
import { Task } from '@lib/types'
import TaskSection from '@components/task-section'
import { GetServerSideProps } from 'next'
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
        { task ? (
          <TaskSection task={task} />
        ) : (
          <>
          <h1> Task Not Found </h1>
          <Link href="/users"><a>Click here to check your Tasks.</a></Link>
          </>
        )}
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