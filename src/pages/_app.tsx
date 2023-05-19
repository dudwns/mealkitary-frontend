import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
