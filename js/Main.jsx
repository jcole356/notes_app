import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Container from "./Container";
import Login from "./Login";

import "../css/main.css";

function ProtectedRoute({ setToken, token }) {
  return (
    <Route
      exact
      path="/"
      render={() =>
        token ? <Container logout={setToken} /> : <Redirect to="/login" />
      }
    />
  );
}

ProtectedRoute.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

// TODO: could just store authState as a boolean instead of storing the token
function Page() {
  const [token, setToken] = useState(sessionStorage.getItem("JWT") || "");

  return (
    <Router>
      <ProtectedRoute setToken={setToken} token={token} />
      <Route
        path="/login"
        render={() => <Login setToken={setToken} token={token} />}
      />
    </Router>
  );
}

ReactDOM.render(<Page />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
