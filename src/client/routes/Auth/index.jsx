import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import HTMLForm from "../../ui/HTMLForm";

export const AuthContext = createContext({ loading: true });

export const AuthForm = ({ onSubmit, ...props }) => {
  const navigate = useNavigate();
  const [, setUser] = useContext(AuthContext);
  return (
    <HTMLForm
      {...props}
      onError={async (err) => {
        // const text = await err.text();
        // console.log(text, err);
      }}
      onSubmit={async (res) => {
        const { error, redirect, user } = await res.json();
        console.log({ error, redirect, user });
        if (error) console.error(error);
        else setUser(user);
        if (typeof onSubmit === "function") onSubmit({ error, redirect, user });
        else if (redirect) return navigate(redirect);
      }}
    />
  );
};

export { default as SignUp } from "./SignUp";
export { default as SignIn } from "./SignIn";
export { default as SignOut } from "./SignOut";
