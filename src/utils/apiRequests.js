const API_BASE_URL = "https://peaceful-refuge-02586.herokuapp.com/api";
// const API_BASE_URL = "http://localhost:9000/api";

export default async function apiRequest(url, type, body = "") {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const URL = API_BASE_URL + url;
  const method = type.toLowerCase();
  return new Promise(async (resolve, reject) => {
    try {
      const request = {
        method,
        headers: {
          "Content-Type": "application/json",
          user: user.uid,
        },
      };
      if (method.toLowerCase() === "post") {
        request.body = body;
      }
      const response = await fetch(URL, request);
      const json = await response.json();
      console.log(URL, type.toLowerCase(), body, json);
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
}
