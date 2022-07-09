import axios from "axios";

const main = async () => {
  try {
    const result = await request();
    console.log("result!", result.data.data.books);
  } catch (err: any) {
    console.log(
      "ERROR!",
      err.response.status,
      `[${err.response.statusText}]`,
      err.response.data.errors[0].message
    );
  }
};

const request = async () => {
  return await axios({
    method: "post",
    headers: { "content-type": "application/json" },
    url: "http://localhost:4000",
    data: { query: "query { books {id title price}}" },
  });
};

main();
