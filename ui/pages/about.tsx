import Layout from "../components/layout";

export default function AboutPage() {
  return (
    <>
      <Layout>
        <div className="text-5xl text-blue-300 p-2 pb-5">About</div>
        <div>
          <div className="text-2xl pb-10">
            This is a simple pastebin written in Golang and Typescript
            <br />
            <br />
            <a href="https://github.com/Sysnomid/paste" className="underline">
              Github
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
