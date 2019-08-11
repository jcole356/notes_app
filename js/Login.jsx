import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// TODO: expire tokens and perform health check
const setSessionToken = token => {
  // eslint-disable-next-line no-undef
  sessionStorage.setItem("JWT", token);
};

// TODO: props types
const login = setToken => {
  // eslint-disable-next-line no-undef
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const myInit = {
    method: "POST",
    headers: myHeaders,
    cache: "default"
  };

  // TODO: need to dynamically set the params
  // eslint-disable-next-line no-undef
  const myRequest = new Request(
    "http://localhost:3000/api/login?username=testy&password=password"
  );

  // eslint-disable-next-line no-undef
  fetch(myRequest, myInit)
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
      console.log("error", err);
      console.log("I am getting an error here");
    });
};

// TODO: props types
const Login = ({ setToken, token }) => {
  return token ? (
    <Redirect to="/" />
  ) : (
    <div>
      <button onClick={() => login(setToken)} type="button">
        Login
      </button>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default Login;
