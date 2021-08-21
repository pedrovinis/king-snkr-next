import { SSRProvider, OverlayProvider } from 'react-aria'
import Router from 'next/router'
import '@styles/global.css'
import '@styles/nprogress.css'
import '@styles/chrome-bug.css'
import type { AppProps } from 'next/app'
import ResizeHandler from '@components/resize-handler'
import { useEffect } from 'react'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', ()=> {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])
  
  return (
    <SSRProvider>
      <OverlayProvider>
        <Component {...pageProps} />
        <ResizeHandler />
      </OverlayProvider>
    </SSRProvider>
  );
}
