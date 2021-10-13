import '@styles/global.css'
import '@styles/chrome-bug.css'
import '@styles/toastify.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { AuthProvider } from '@components/context/auth-context'
import { UserProductsProvider } from '@components/context/user-products-context'
import { TaskProvider } from '@components/context/task-context'
import { PayLoadsProvider } from '@components/context/payloads-context'
import { ConfigProvider } from '@components/context/config-context'
import { handleKingSnkrId } from '@lib/handle-local-storage'
import Layout from '@components/layout/layout'


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading')
    handleKingSnkrId(window.localStorage)
  }, [])

  return (
    <AuthProvider>
      <UserProductsProvider>
        <ConfigProvider>
          <PayLoadsProvider>
            <TaskProvider>
                <Layout>
                  <ToastContainer transition={Slide}/>
                  <Component {...pageProps}/>
                </Layout>
            </TaskProvider>
          </PayLoadsProvider>
        </ConfigProvider>
      </UserProductsProvider>
    </AuthProvider>
  )
}
