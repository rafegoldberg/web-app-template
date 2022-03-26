import React, { useContext } from "react";
import { AuthContext } from "~/src/client/routes/Auth";
import { SignIn } from "../routes/Auth";

const EnsureAuth = ({ children, ...props }) => {
  const [user] = useContext(AuthContext);
  if (user.username) return children;
  return <SignIn onSubmit={() => {}} />;
};

export default EnsureAuth;
