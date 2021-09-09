import { SkipNavContent } from '@reach/skip-nav'

import Page from '@components/page'
import IndexComp from '@components/index'

export default function Conf() {
  const meta = {
    title: 'King Snkr | pXv',
    description: 'pXv'
  }

  return (
    <Page meta={meta} fullViewport>
      <SkipNavContent />
      <IndexComp />
    </Page>
  )
}
