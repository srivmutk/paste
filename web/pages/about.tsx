import React from "react";
import Layout from "../components/layout";

export default function AboutPage() {
  return (
    <>
      <Layout>
        <div className="text-5xl text-blue-300 p-2 pb-5">About</div>
        <div>
          <div className="text-2xl">
            <div>
              A simple pastebin created by{" "}
              <a href="https://sysnomid.com" className="underline">
                Sysnomid
              </a>
              .
            </div>
            <a href="https://github.com/Sysnomid/paste" className="underline">
              Github
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
