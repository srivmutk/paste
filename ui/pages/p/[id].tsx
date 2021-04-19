import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-go.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-markdown.min";
import "prismjs/components/prism-makefile.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-java.min";
import "prismjs/components/prism-vim.min";
import "prismjs/components/prism-ignore.min";
import "prismjs/components/prism-elixir.min";
import "prismjs/components/prism-mongodb.min";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-tsx.min";
import "prismjs/components/prism-sql.min";
import "prismjs/components/prism-r.min";
import "prismjs/components/prism-rust.min";
import "prismjs/components/prism-json.min";
import "prismjs/components/prism-zig.min";
import "prismjs/components/prism-yaml.min";
import "prismjs/components/prism-ruby.min";
import "prismjs/components/prism-solidity.min";
import "prismjs/components/prism-lua.min";
import "prismjs/components/prism-css.min";
import "prismjs/components/prism-elm.min";
import "prismjs/components/prism-csharp.min";
import "prismjs/components/prism-fsharp.min";
import "prismjs/components/prism-haskell.min";
import "prismjs/components/prism-swift.min";
import "prismjs/components/prism-scala.min";
import "prismjs/components/prism-graphql.min";
import "prismjs/components/prism-powershell.min";
import "prismjs/components/prism-toml.min";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import Layout from "../../components/layout";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import Custom404 from "../404";
import Link from "next/link";
import Head from "next/head";

const SERVER_URL = process.env.SERVER_URL as string;

export const getServerSideProps = async (context: { query: { id: any } }) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

export default function GetPaste({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  React.useEffect(() => {
    Prism.highlightAll();
  });

  const { data: result, error } = useSWR(`${SERVER_URL}/p/${id}`);

  if (error) {
    <Custom404 />;
  }

  if (!result) {
    return <Layout>Loading ...</Layout>;
  }

  let parsedData = JSON.parse(JSON.stringify(result));

  return (
    <>
      <Layout>
        <Head>
          <title>
            {parsedData.Title} -{" "}
            {dayjs(parsedData.CreatedAt).format("MMMM DD, YYYY HH:MM:ss")}
          </title>
        </Head>
        <div className="bg-gray-700 ml-80 mr-80 p-10 bg-center ml-full mr-full md:w-full xl:w-11/12 rounded-xl shadow-8xl">
          <div className="flex flex-col">
            <div className="text-4xl font-black break-words pb-3 sm:pb-10 md:pb-5">
              {parsedData.Title}
            </div>
            <div className="text-1xl break-words italic">
              {dayjs(parsedData.CreatedAt).format("MMMM DD, YYYY HH:MM:ss")}
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="float-right mt-10 bg-gray-600 mb-5 bg-center w-auto p-5 rounded-xl shadow-8xl text-gray-200 mr-5">
            {parsedData.LanguageDisplayName}
          </div>
          <div>
            <Link href={`${SERVER_URL}/p/${id}/raw`}>
              <button className="float-right mt-10 ml-auto bg-blue-700 mb-5 bg-center w-auto p-5 rounded-xl shadow-8xl text-gray-200">
                View Raw
              </button>
            </Link>
          </div>
        </div>
        <pre className="line-numbers p-10 bg-center w-full rounded-xl shadow-8xl">
          <code className={`language-${parsedData.Language}`}>
            {parsedData.Text}
          </code>
        </pre>
      </Layout>
    </>
  );
}
