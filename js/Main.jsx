import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Container from "./Container";
import Login from "./Login";
import "../css/main.css";

function Page() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/Container" component={Container} />
    </Router>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Page />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
