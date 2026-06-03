import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/admin.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
