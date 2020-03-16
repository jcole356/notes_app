import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { login as loginApi } from "./services/api";

// TODO: expire tokens and perform health check
const setSessionToken = token => {
  sessionStorage.setItem("JWT", token);
};

const login = ({ username, password }, setToken) => {
  loginApi(username, password)
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
      <form
        onSubmit={e => {
          e.preventDefault();
          const username = e.target[0].value;
          const password = e.target[1].value;
          login({ username, password }, setToken);
        }}
      >
        <label htmlFor="username">
          Username:
          <input id="username" type="text" />
        </label>
        <label htmlFor="password">
          Password:
          <input id="password" type="password" />
        </label>
        <input name="Submit" type="submit" />
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default Login;
