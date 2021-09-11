import { SSRProvider, OverlayProvider } from 'react-aria'
import '@styles/global.css'
import '@styles/chrome-bug.css'
import '@styles/toastify.css'
import type { AppProps } from 'next/app'
import ResizeHandler from '@components/resize-handler'
import { useEffect } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { AuthProvider } from '@components/auth-context'
import { UserProductsProvider } from '@components/user-products-context'


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
