import '@/styles/globals.css'

import { Montserrat} from '@next/font/google';
const font = Montserrat({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  )
}
