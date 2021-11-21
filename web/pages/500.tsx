import Layout from "../components/layout";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Layout>
        <Head><title>500 Internal Server Error</title></Head>
        <div className="pb-96">
          <h1 className="text-9xl">500</h1>
          <p>Internal Server Error</p>
        </div>
      </Layout>
    </>
  );
}
