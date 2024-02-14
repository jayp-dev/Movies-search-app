import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StartRating";
// import ExpendedText from "./ExpendedText";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxrating={5}
      messages={["bad", "poor", "amazing", "excellent", "awesome"]}
    /> */}
    {/* <ExpendedText /> */}
  </React.StrictMode>
);
