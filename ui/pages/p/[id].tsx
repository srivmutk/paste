import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-go.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-markdown.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-java.min";
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
import "prismjs/components/prism-csharp.min";
import "prismjs/components/prism-haskell.min";
import "prismjs/components/prism-swift.min";
import "prismjs/components/prism-scala.min";
import "prismjs/components/prism-graphql.min";
import "prismjs/components/prism-powershell.min";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import Layout from "../../components/layout";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import useSWR from "swr";

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
    if (process.browser) {
      window.location.href = "/404";
    }
  }

  if (!result) {
    return <Layout>Loading ...</Layout>;
  }

  let parsedData = JSON.parse(JSON.stringify(result));

  return (
    <>
      <Layout>
        <div className="bg-gray-700 pl-5 pt-5 mb-10 pb-5 bg-center w-full rounded-md shadow-8xl">
          <span className="flex">
            <div className="text-4xl break-words">{parsedData.Title}</div>
            <div className="text-1xl break-words float-right ml-auto mt-2 mr-5 italic">
              {parsedData.CreatedAt}
            </div>
          </span>
        </div>
        <pre className="line-numbers pl-5 pt-5 pb-5 bg-center w-full rounded-md shadow-8xl">
          <code className={`language-${parsedData.Language}`}>
            {parsedData.Text}
          </code>
        </pre>
      </Layout>
    </>
  );
}
