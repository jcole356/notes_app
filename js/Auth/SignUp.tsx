import React from "react";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SignUpForm({ handleChange }: Props) {
  return (
    <>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          name="username"
          onChange={handleChange}
          type="text"
        />
      </label>
      <label htmlFor="email">
        Email:
        <input id="email" name="email" onChange={handleChange} type="text" />
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
    </>
  );
}

export default SignUpForm;
