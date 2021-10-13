import fs from 'fs'
import Page from '@components/page/page'
import TasksGrid from '@components/tasks-grid'
import Header from '@components/common/header'
import { GetServerSideProps } from 'next'
import { Task } from '@lib/types'
import Link from 'next/link'
import EmptyList from '@components/common/empty-list'
import i18n from 'translate/i18n'

type Props = {
  tasks: Task[]
}

export default function SnkrsPage( {tasks}: Props) {
  const meta = {
    title: 'Tasks',
  }

  const isEmpty = !tasks.length

  return (
    <Page meta={meta}>
        <Link href={'/addtask'}>
          <button>
            {i18n.t('buttons.add_task')}
          </button>
        </Link>
        {isEmpty ? (
          <EmptyList list={'task'} buttonText={i18n.t('buttons.add_task')}/>
        ): (
          <TasksGrid tasks={tasks} />
        )}
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