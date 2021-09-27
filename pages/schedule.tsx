import fs from 'fs'
import { GetServerSideProps } from 'next'
import Page from '@components/page'
import Schedule from '@components/schedule'
import Layout from '@components/layout'
import Header from '@components/header'
import { Stage, Snkr } from '@lib/types'

type Props = {
  schedule: Stage[]
}

export default function SchedulePage({ schedule }: Props) {
  const meta = {
    title: 'King Snkr | Schedule',
    description: 'Sneakers added schedule, to add a sneaker go to "SNEAKERS" and click on "Add SNEAKER".'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allStages={schedule} /> 
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })

  const schedule:Stage[] = formatSchedule(snkrs)

  return {
    props: {
      schedule
    }
  }
}

const formatSchedule = (snkrs:Snkr[]) => {
    const now = Date.now() / 1000
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    tomorrow.setHours(0,0,0,0)

    
    const sortedSnkrs = snkrs.sort((a,b) => {
      if((a.release - now) +  ((tomorrow.getTime()/1000) - now) <= 0) return 1
      if((b.release - now) + ((tomorrow.getTime()/1000) - now) <= 0) return -1
      return a.release - b.release
    })

    const snkrByDate:any = {}

    sortedSnkrs.map( snkr => {
        const date = new Date(snkr.release*1000).toLocaleString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })

        if(!snkrByDate[date]) snkrByDate[date] = []
        snkrByDate[date].push(snkr)
    })
    const formatedSchedule = Object.keys(snkrByDate).map( date => {
      return {
        name: date,
        slug: '/snkrs',
        schedule: snkrByDate[date]
      }
    })
    return formatedSchedule
}