import React, { FormEvent, Dispatch, SetStateAction, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import SignUpForm from "./SignUp";
import { login as loginApi, register, AuthParams } from "../services/api";

type Props = {
  setToken: Dispatch<SetStateAction<string>>;
  token: string;
  isLoginPage: boolean;
};

// TODO: expire tokens and perform health check
const setSessionToken = (token: string) => {
  sessionStorage.setItem("JWT", token);
};

const login = (
  params: AuthParams,
  setToken: (token: string) => void,
  authCallback: (credentials: AuthParams) => Promise<Response>
) => {
  authCallback(params)
    .then((response) =>
      response.json().then((json) => {
        console.log("response json", json);
        const { token } = json;
        if (token) {
          setSessionToken(token);
          setToken(token);
        }
      })
    )
    .catch((err) => {
      console.log("error from login", err);
    });
};

function Login({ setToken, token, isLoginPage }: Props) {
  const [formState, setFormState] = useState<AuthParams>({
    email: '',
    username: '',
    password: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setFormState({ ...formState, [name]: value });
  }

  let form;
  if (isLoginPage) {
    form = (
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          login(formState, setToken, loginApi);
        }}
      >
        <label htmlFor="username">
          Username:
          <input
            id="username"
            name="username"
            onChange={handleChange}
            type="text"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            name="password"
            onChange={handleChange}
            type="password"
          />
        </label>
        <button className="login-button" name="Submit" type="submit">
          Submit
        </button>
      </form>
    );
  } else {
    form = (
      <SignUpForm
        setToken={setToken}
        handleChange={handleChange}
        handleSubmit={() => {
          login(formState, setToken, register)
        }}
      />
    )
  }

  let link;
  if (isLoginPage) {
    link = <Link className="auth-link" to="/register">Need an account?</Link>;
  } else {
    link = <Link className="auth-link" to="/login">Already have an account?</Link>;
  }

  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="login-page">
      <h4>Todoozer</h4>
      {form}
      {link}
    </div>
  );
}

export default Login;
