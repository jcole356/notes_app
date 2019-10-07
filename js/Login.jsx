import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { login as loginApi } from "./services/api";

// TODO: expire tokens and perform health check
const setSessionToken = token => {
  sessionStorage.setItem("JWT", token);
};

const login = setToken => {
  loginApi("testy", "password")
    .then(response =>
      response.json().then(json => {
        console.log("response json", json);
        const { token } = json;
        if (token) {
          setSessionToken(token);
          setToken(token);
        }
      })
    )
    .catch(err => {
      console.log("error from login", err);
    });
};

function Login({ setToken, token }) {
  return token ? (
    <Redirect to="/" />
  ) : (
    <div>
      <button onClick={() => login(setToken)} type="button">
        Login
      </button>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default Login;
