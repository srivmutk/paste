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

  let parsedData;

  if (result) {
    parsedData = JSON.parse(JSON.stringify(result));
  }

  return (
    <>
      <Layout>
        <Head>
          {result && <>
            <title>
              {parsedData.Title} -{" "}
              {dayjs(parsedData.CreatedAt).format("MMMM DD, YYYY HH:MM:ss")}
            </title>
          </>}
        </Head>

        {/*  Handle Errors  */}
        {error && <Custom404 />}

        {/*  Handle Loading  */}
        {!result && !error && (
          <Layout>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "auto", background: "none" }}
              width="100"
              height="200"
              display="block"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#e15b64"
                strokeDasharray="164.93361431346415 56.97787143782138"
                strokeWidth="10"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 50 50;360 50 50"
                ></animateTransform>
              </circle>
            </svg>
          </Layout>
        )}

        {result && (
          <>
            {" "}
            <div className="bg-gray-700 ml-80 mr-80 p-10 bg-center ml-full mr-full w-screen md:w-full sm:w-screen xl:w-full md:rounded-xl xl:rounded-xl rounded-sm shadow-8xl">
              <div className="flex flex-col">
                <div className="text-4xl font-black break-words pb-5">
                  {parsedData.Title}
                </div>
                <div className="text-1xl break-words italic">
                  {dayjs(parsedData.CreatedAt).format("MMMM DD, YYYY HH:MM:ss")}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="break-words mt-10 align-center bg-gray-600 mb-10 bg-center w-auto p-5 h-auto rounded-xl shadow-8xl text-gray-200 mr-5">
                {parsedData.LanguageDisplayName}
              </div>
              <div>
                <Link href={`${SERVER_URL}/p/${id}/raw`}>
                  <button className="mt-10 ml-auto bg-blue-700 mb-10 bg-center w-auto p-5 sm: h-auto rounded-xl shadow-8xl text-gray-200 whitespace-nowrap">
                    View Raw
                  </button>
                </Link>
              </div>
            </div>
            <pre className="line-numbers p-10 bg-center w-screen md:w-full sm:w-screen xl:w-full rounded-sm shadow-8xl break-all">
              <code className={`language-${parsedData.Language}`}>
                {parsedData.Text}
              </code>
            </pre>
          </>
        )}
      </Layout>
    </>
  );
}
