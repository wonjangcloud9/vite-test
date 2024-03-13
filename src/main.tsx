import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RecoilRoot } from "recoil";
import Root from "./Root.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </React.StrictMode>
);
