import React from "react";
import HTMLForm from "../../ui/HTMLForm";

const SignUp = () => (
  <HTMLForm action="sign/up" method="POST">
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
    <button type="submit">Submit</button>
  </HTMLForm>
);

export default SignUp;
