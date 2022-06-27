import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { register } from './serviceWorkerRegistration';

ReactDOM.render(<App />, document.getElementById("root"));

register();