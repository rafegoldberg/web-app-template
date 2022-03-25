import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import { SignIn, SignUp } from "./Auth";

const App = () => (
  <main>
    <h3>Web App Scaffold</h3>
    <Outlet />
  </main>
);

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="sign">
        <Route path="up" element={<SignUp />} />
        <Route path="in" element={<SignIn />} />
      </Route>
      <Route index element={<b>👋 Hi world!</b>} />
      <Route path="*" element={<b>⛔️ Not Found.</b>} />
    </Route>
  </Routes>
);

export default AppRouter;
