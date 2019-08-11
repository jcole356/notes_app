import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Container from "./Container";
import Login from "./Login";
import "../css/main.css";

const protectedRoute = (token, setToken) => {
  return (
    <Route
      exact
      path="/"
      render={() =>
        token ? <Container logout={setToken} /> : <Redirect to="/login" />
      }
    />
  );
};

// TODO: token needs to be store in state for logout to work
function Page() {
  // eslint-disable-next-line no-undef
  const [token, setToken] = useState(sessionStorage.getItem("JWT"));
  console.log("token", token);
  return (
    <Router>
      {protectedRoute(token, setToken)}
      <Route
        path="/login"
        // TODO: sort
        render={() => <Login token={token} setToken={setToken} />}
      />
    </Router>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Page />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
