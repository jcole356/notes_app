import React, { FormEvent, Dispatch, SetStateAction, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import SignInForm from "./SignIn";
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

  const FormComponent = isLoginPage ? SignInForm : SignUpForm;

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
      <FormComponent
        setToken={setToken}
        handleChange={handleChange}
        handleSubmit={() => {
          login(formState, setToken, loginApi)
        }}
      />
      {link}
    </div>
  );
}

export default Login;
