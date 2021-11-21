import Layout from "../components/layout";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Layout>
        <Head>
          <title>404 Not Found</title>
        </Head>
        <div className="pb-96">
          <h1 className="text-9xl">404</h1>
          <p>Not Found</p>
        </div>
      </Layout>
    </>
  );
}
