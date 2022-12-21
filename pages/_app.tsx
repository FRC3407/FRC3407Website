// DON'T WRITE YOUR WEB PAGES HERE

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
