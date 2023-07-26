import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "../page/Admin/SignIn";
import { AdminHome } from "../page/Admin/AdminHome";
import { AdminUserEdit } from "../page/Admin/AdminUserEdit";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;
export const AllAdminRoute = () => {
  const adminAvailable = JSON.parse(localStorage.getItem("adminAvailable"));
  const isAdminAvailable = useSelector((state) => state.isAdminSignedIn);

  const handleAdminReq = async () => {
    const res = await axios
      .get("http://localhost:3001/isadmin", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log("error", err);
      });
    const data = res?.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    handleAdminReq().then((data) => {
      if (data) {
        console.log(data);
      } else {
        JSON.parse(localStorage.getItem("adminAvailable"));
        localStorage.setItem("adminAvailable", JSON.stringify(false));
      }
    });
  });

  console.log(adminAvailable);
  console.log(isAdminAvailable);

  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={adminAvailable ? <Navigate to="/admin/" /> : <SignIn />}
        />
        <Route
          path="/edit/:id"
          element={
            (adminAvailable && isAdminAvailable === false) ||
            isAdminAvailable === true ? (
              <AdminUserEdit />
            ) : (
              <Navigate to="/admin/signin" />
            )
          }
        />
        <Route
          path="/"
          element={
            (adminAvailable && isAdminAvailable === false) ||
            isAdminAvailable === true ? (
              <AdminHome />
            ) : (
              <Navigate to="/admin/signin" />
            )
          }
        />
      </Routes>
    </>
  );
};
