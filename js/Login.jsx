import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// TODO: expire tokens and perform health check
const setSessionToken = token => {
  sessionStorage.setItem("JWT", token);
};

const login = setToken => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const myInit = {
    method: "POST",
    headers: myHeaders,
    cache: "default"
  };

  // TODO: need to dynamically set the params
  const myRequest = new Request(
    "http://localhost:3000/api/login?username=testy&password=password"
  );

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
