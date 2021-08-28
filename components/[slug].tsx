import fs from 'fs'
import Page from '@components/page'
import Layout from '@components/layout'
import { Task } from '@lib/types'
import TaskSection from '@components/task-section'
import { GetServerSideProps } from 'next'

type Props = {
  task: Task
}

export default function UserPage({ task }: Props) {
  const meta = {
    title: `King Snkr | ${task.name}`,
    description: 'pXv'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <TaskSection task={task} />
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const tasksFileName = fs.readdirSync('bin/tasks')
  const tasks: Task[] = tasksFileName.map( (taskFileName) => {
    return JSON.parse(fs.readFileSync(`bin/tasks/${taskFileName}`, 'utf8'))
  })
  const task = tasks.find((s:any) => s.slug === slug) || null;

  if (!task) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      task: task
    }
  }
}