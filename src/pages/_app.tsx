import { QueryClient, QueryClientProvider } from 'react-query';
import Message from '@/components/Message';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <div className="w-full max-w-xl mx-auto">
          <Component {...pageProps} />
        </div>
        <Message />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
