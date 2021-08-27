import fs from 'fs'
import Page from '@components/page'
import SnkrsGrid from '@components/snkrs-grid'
import Header from '@components/header'
import Layout from '@components/layout'

import { GetServerSideProps } from 'next'
import { Snkr } from '@lib/types'
import Link from 'next/link'
import EmptyList from '@components/empty-list'

type Props = {
  tasks: Snkr[]
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
          <></>// <EmptyList list={'tasks'} buttonText={'Add Task'}/>
        ): (
          {/* <SnkrsGrid snkrs={snkrs} /> */}
        )}

      </Layout>
    </Page>
  )
}

// export const getServerSideProps: GetServerSideProps = async() => {
//   const snkrsFileName = fs.readdirSync('bin/snkrs')
//   const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
//     return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
//   })

//   return {
//     props: {
//       snkrs
//     }
//   }
// }