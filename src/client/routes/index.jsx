import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "./Users";

const AppRouter = () => (
  <Routes>
    <Route path="/">
      <Route path="signup" element={<SignUp />} />
      <Route index element={<b>👋 Hi world!</b>} />
      <Route path="*" element={<b>⛔️ Not Found.</b>} />
    </Route>
  </Routes>
);

export default AppRouter;
