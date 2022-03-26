import React, { useContext, useEffect } from "react";
import { AuthContext } from ".";

const SignUp = () => {
  const [, updateAuth] = useContext(AuthContext);
  useEffect(() => updateAuth({}), []);
  return <span>🔒 Signed out.</span>;
};

export default SignUp;
