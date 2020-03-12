import axios from "axios";

//brought over from previous project need to update to fit backend
const getSearchResult = async () => {
  let headers = await sessionStorage.getItem("drinks");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  };

  const response = await axios.get("/drinks", {
    headers: headers
  });

  return response;
};

export { getSearchResult };
