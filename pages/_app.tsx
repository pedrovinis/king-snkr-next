import { SSRProvider, OverlayProvider } from 'react-aria'
import Router from 'next/router'
import '@styles/global.css'
import '@styles/nprogress.css'
import '@styles/chrome-bug.css'
import '@styles/toastify.css'
import type { AppProps } from 'next/app'
import ResizeHandler from '@components/resize-handler'
import { useEffect } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import NProgress from 'nprogress'
import { AuthProvider } from '@components/auth-context'
import { UserProductsProvider } from '@components/user-products-context'


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
    <AuthProvider>
      <UserProductsProvider>
        <SSRProvider>
          <OverlayProvider>
            <ToastContainer transition={Slide}/>
            <Component {...pageProps} />
            <ResizeHandler />
          </OverlayProvider>
        </SSRProvider>
      </UserProductsProvider>
    </AuthProvider>
  )
}
