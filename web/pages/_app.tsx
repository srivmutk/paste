import type { AppProps } from "next/app";
import "../styles/index.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Head from "next/head";
import { SWRConfig } from "swr";
import React, { useState } from "react";

const SERVER_URL = process.env.SERVER_URL as string;

const App = ({ Component, pageProps }: AppProps) => {

  const [title, setTitle] = useState("");

  React.useEffect(() => {
      // const checkVar = () => {
      //   if (document.title !== ""){
      //     setTitle((document.title).toString())
      //     console.log(title)
      //   } else {
      //     setTimeout(() => {
      //       checkVar()
      //     }, 0);
      //   }
      // }

      // checkVar()

      setTitle(document.title)
  }, []);

  return (
      <html lang="en">
        
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: async (resource, init) => {
              const res = await fetch(resource, init);

              if (!res.ok) {
                const error = new Error("Error Occured while Fetching");
                console.log(res.status);
                throw error;
              }

              return res.json();
            },
          }}
        >
          <div className="flex flex-col h-screen justify-between">
            <Head>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap"
                rel="stylesheet"
              ></link>
              <link
                rel="preload"
                href={SERVER_URL}
                as="fetch"
                crossOrigin="anonymous"
              ></link>
             
              <meta name="title" content={title} />
              <meta name="description" content="Paste by Sysnomid" />
              <meta name="og:title" content={title} />
              <meta name="og:description" content="Paste by Sysnomid" />
              <meta
                name="image"
                content="https://paste.sysnomid.com/meta.png"
              />
              <meta
                name="og:image"
                content="https://paste.sysnomid.com/meta.png"
              />
            </Head>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </SWRConfig>
      </html>
  );
};

export default App;
