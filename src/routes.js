import { Route, Routes } from "react-router-dom";

import React from "react";
import { Login } from "./component/auth/login";
import { PageNotFound } from "./component/PageNotFound";
import { PractiseThree } from "./component/PractiseThree";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PractiseThree/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
