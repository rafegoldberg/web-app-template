import React from "react";
import { AuthForm } from ".";

const SignUp = () => (
  <AuthForm action="sign/up" method="POST">
    <label>
      <span>Full Name:</span>
      <input type="text" name="name" required />
    </label>
    <label>
      <span>Username:</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>Password:</span>
      <input type="password" name="password" required />
    </label>
    <button type="submit">Sign Up</button>
  </AuthForm>
);

export default SignUp;
