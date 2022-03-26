import React, { useContext, useState } from "react";
import {
  Route,
  Routes,
  Outlet,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import EnsureAuth from "../ui/EnsureAuth";

import { SignIn, SignUp, SignOut, AuthContext } from "./Auth";

const App = () => {
  const [{ username }] = useContext(AuthContext);
  return (
    <main>
      <header>
        <h3>
          <Link to="/">Web App</Link>
        </h3>
        <small>
          {username ? (
            <a href="/sign/out">Log Out</a>
          ) : (
            <nav>
              <NavLink to="/sign/in">Log In</NavLink>
              or
              <NavLink to="/sign/up">Sign Up</NavLink>
            </nav>
          )}
        </small>
      </header>
      <hr />
      <Outlet />
    </main>
  );
};

const AppRouter = () => {
  const local = useLocation();
  const [user, updateUser] = useState({});
  return (
    <AuthContext.Provider value={[user, updateUser]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="sign">
            <Route path="up" element={<SignUp />} />
            <Route path="in" element={<SignIn />} />
            <Route path="out" element={<SignOut />} />
          </Route>
          <Route
            path="protected/*"
            element={
              <EnsureAuth>
                <p>Some sensitive shit here: {local.pathname}.</p>
              </EnsureAuth>
            }
          />
          <Route
            index
            element={
              <p>
                👋 Hi {user.name ?? "world"}! &nbsp;
                <Link to="/protected/test">Check it out</Link>.
              </p>
            }
          />
          <Route path="*" element={<p>😬 Not found.</p>} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default AppRouter;
