import Head from "next/head";
import React from "react";
import Layout from "../components/layout";

export default function AboutPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>About</title>
        </Head>
        <div className="text-5xl text-blue-300 p-2 pb-5">About</div>
        <div>
          <div className="text-2xl">
            <div>
              A simple pastebin.
            </div>
            <a href="https://github.com/srivmutk/paste" className="underline">
              Github
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
