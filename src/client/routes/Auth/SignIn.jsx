import React from "react";
import { AuthForm } from ".";

const SignIn = ({ onSubmit }) => (
  <AuthForm action="sign/in" method="POST" onSubmit={onSubmit}>
    <label>
      <span>Username:</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>Password:</span>
      <input type="password" name="password" required />
    </label>
    <button type="submit">Log In</button>
  </AuthForm>
);

export default SignIn;
