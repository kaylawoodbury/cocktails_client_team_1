import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as ServiceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

ServiceWorker.unregister();
