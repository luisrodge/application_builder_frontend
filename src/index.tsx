import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { message } from "antd";
import "antd/dist/antd.css";

import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import ScrollToTop from "./components/ScrollToTop";

message.config({
  maxCount: 1,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
