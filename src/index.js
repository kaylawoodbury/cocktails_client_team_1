import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ServiceWorker from "./serviceWorker";
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3000/api/"
axios.defaults.baseURL = "https://cocktails-api-team1.herokuapp.com/"

ReactDOM.render(<App />, document.getElementById("root"));

ServiceWorker.unregister();
