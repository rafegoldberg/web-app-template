import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => (
  <Routes>
    <Route path="/">
      <Route index element={<b>👋 Hey World!</b>} />
      <Route path="*" element={<b>⛔️ Not Found.</b>} />
    </Route>
  </Routes>
);

export default AppRouter;
