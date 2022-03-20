/**
 * React App Entry Script
 * @see: /index.html
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./routes";
import "./styles/main.scss";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("App")
);
