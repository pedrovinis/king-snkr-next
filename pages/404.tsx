import Page from '@components/page/page'
import IconLogo from '@components/icons/logo-icon'
import Link from 'next/link'

export default function Conf() {
  const meta = {
    title: 'Error',
  }

  return (
    <Page meta={meta}>
      <span><IconLogo size={'100'}/></span>
      <h1> Error, Please Try Again.</h1>
    </Page>
  )
}
