import React, { FormEvent, Dispatch, SetStateAction, useState } from "react";
import { Redirect } from "react-router-dom";

import { login as loginApi } from "./services/api";

type Props = {
  setToken: Dispatch<SetStateAction<string>>;
  token: string;
};

// TODO: expire tokens and perform health check
const setSessionToken = (token: string) => {
  sessionStorage.setItem("JWT", token);
};

const login = (
  { username, password }: { username: string; password: string },
  setToken: (token: string) => void
) => {
  loginApi(username, password)
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

interface FormState {
  username: string;
  password: string;
}

function Login({ setToken, token }: Props) {
  const [formState, setFormState] = useState<FormState>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setFormState({ ...formState, [name]: value });
  }

  return token ? (
    <Redirect to="/" />
  ) : (
    <div className="login-page">
      <h4>Todoozer</h4>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          login(formState, setToken);
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
          <input id="password" name="password" type="password" />
        </label>
        <button className="login-button" name="Submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
