import React from "react";
import HTMLForm from "../../ui/HTMLForm";

const SignIn = () => (
  <HTMLForm action="sign/in" method="POST">
    <label>
      <span>Username:</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>Password:</span>
      <input type="password" name="password" required />
    </label>
    <button type="submit">Submit</button>
  </HTMLForm>
);

export default SignIn;
