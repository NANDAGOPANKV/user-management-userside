import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/AllUserRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
};

export default App;
