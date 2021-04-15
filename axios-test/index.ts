import axios from "axios"

    const SERVER_URL = "http://localhost:4300/p-create"

    const data = {
        Title: "DROP TABLE languages;",
        Text: "package main import 'fmt'func main(){ fmt.Println('main.go')}",
        Language: "none",
    }
    
    const axiosFn = async (expiry: null | string) => {
      await axios
        .post(`${SERVER_URL}`, {
          title: data.Title,
          text: data.Text,
          language: data.Language,
          expires_at: expiry,
        })
        .then((res) => {
          console.log(`${res.data}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };

axiosFn(null)