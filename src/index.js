import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ServiceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1";

ReactDOM.render(<App />, document.getElementById("root"));

ServiceWorker.unregister();
