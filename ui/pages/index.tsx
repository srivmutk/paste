import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useSWR from "swr";
import axios from "axios";
import { time } from "console";

dayjs.extend(utc);

interface FormInputs {
  Title: string;
  Text: string;
  ExpiresAt: string;
  Language: string;
}

interface ErrorMsg {
  Msg: string;
}

const SERVER_URL = process.env.SERVER_URL as string;

// Error message
const ErrorMsg = ({ Msg }: ErrorMsg) => {
  return (
    <>
      <span className=" text-black bg-yellow-600 error-color rounded-xl p-5 mb-3 mt-3">
        {Msg}
      </span>
    </>
  );
};

const IndexPage = () => {
  const { data } = useSWR(`${SERVER_URL}/langs`);
  const [language, setLanguage] = React.useState("none");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    const fetchFn = (expiry: null | string) => {
      fetch(`${SERVER_URL}/p-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: data.Title,
          text: data.Text,
          language: data.Language,
          expires_at: expiry,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Success", data);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    };

    if (data.ExpiresAt === "never") {
      fetchFn(null);
    } else {
      fetchFn(data.ExpiresAt);
    }

    reset();
  };

  let parsedData;
  try {
    parsedData = JSON.parse(JSON.stringify(data));
    console.log(parsedData.data);
  } catch {
    return (
      <>
        <div>
          <Layout>Server Side Error ... Try again Later</Layout>
        </div>
      </>
    );
  }

  return (
    <>
      <Layout>
        <h1 className="text-3xl text-bold text-blue-200 pb-5">
          Create a New Paste
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap pb-10">
            {errors.Title && <ErrorMsg Msg="Title Required" />}
            {errors.Text && <ErrorMsg Msg="Body Required" />}
            <div className="flex flex-wrap space-x-2 lg:space-x-5 xl:space-x-5 md:space-x-5 sm:space-x-1">
              {/* Paste Title */}
              <div>
                <div className="text-bold mt-5 mb-5 text-2xl">Paste Title</div>
                <input
                  {...register("Title", { required: true })}
                  placeholder="Untitled"
                  className="text-white p-3 text-md bg-gray-600 rounded-md"
                ></input>
              </div>

              {/* Paste Language */}
              <div>
                <div className="text-bold mt-5 mb-5 text-2xl">
                  Paste Language
                </div>
                <select
                  {...register("Language")}
                  name="languages"
                  id="languages"
                  value={language}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setLanguage(e.target.value);
                    console.log(language);
                  }}
                  className="text-white p-3 bg-gray-600 rounded-md text-md"
                >
                  {parsedData.map((data: any) => (
                    <option key={data.Language} value={data.Language}>
                      {data.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Paste Expiry */}
              <div>
                <div className="text-bold mt-5 mb-5 text-2xl">Expires At</div>
                <select
                  {...register("ExpiresAt")}
                  name="expiresat"
                  id="expiresat"
                  className="textarea-w text-white bg-green-800 p-3 mb-5 rounded-md"
                >
                  <option value="never">Never</option>
                  <option
                    value={dayjs.utc().local().add(10, "minute").format()}
                  >
                    10 minutes
                  </option>
                  <option value={dayjs.utc().local().add(1, "hour").format()}>
                    1 hr
                  </option>
                  <option value={dayjs.utc().local().add(1, "day").format()}>
                    1 day
                  </option>
                  <option value={dayjs.utc().local().add(1, "month").format()}>
                    1 month
                  </option>
                  <option value={dayjs.utc().local().add(6, "month").format()}>
                    6 months
                  </option>
                  <option value={dayjs.utc().local().add(1, "year").format()}>
                    1 year
                  </option>
                </select>
              </div>
            </div>

            {/* Paste Body */}
            <div>
              <div className="flex space-x-5 text-bold mt-5 mb-5 text-2xl flex-wrap">
                Paste Body
              </div>
              <pre>
                <textarea
                  {...register("Text", { required: true })}
                  spellCheck="false"
                  placeholder="fmt.Println('Placeholder Stuff)'"
                  className="text-white textarea-c textarea-h textarea-w text-md p-10 block rounded-xl"
                ></textarea>
              </pre>
              <style jsx>{`
                .textarea-c {
                  background-color: #2d2d2d;
                }

                .textarea-h {
                  height: 70vh;
                }
                .textarea-w {
                  width: 70vw;
                }
              `}</style>
            </div>
            <input
              type="submit"
              className="text-white w-full p-5 mt-10 bg-blue-700 rounded-md"
            ></input>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default IndexPage;
