import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
import * as ServiceWorker from "./serviceWorker";
import Testing from "./Testing";


ReactDOM.render(<Testing />, document.getElementById("root"));

ServiceWorker.unregister();
