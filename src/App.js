import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/AllUserRoutes";
import { AllAdminRoute } from "./routes/AllAdminRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AllAdminRoute />} />
      </Routes>
    </>
  );
};

export default App;
