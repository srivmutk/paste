import type { AppProps } from "next/app";
import "../styles/index.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Head from "next/head";
import { SWRConfig } from "swr";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div className="flex flex-col h-screen justify-between">
          <Head>
            <title>paste.sysnomid.com</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </SWRConfig>
    </>
  );
};

export default App;
