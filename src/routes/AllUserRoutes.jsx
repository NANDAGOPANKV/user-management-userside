import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "../page/User/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../page/User/SignIn";
import { UserProfile } from "../page/User/UserProfile";
import { Home } from "../page/User/Home";
import axios from "axios";
import { authActions } from "../redux/store";
// import { EditPage } from "../page/User/EditPage";

axios.defaults.withCredentials = true;
export const UserRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.isLoggedIn);
  const user = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);
  const dispatch = useDispatch(authActions);

  console.log(user);

  // check the user signouted or not is available
  let userAvailable = JSON.parse(localStorage.getItem("userAvilable"));
  console.log("user Available Or Not", userAvailable);
  const handleUserReq = async () => {
    const res = await axios
      .get(`http://localhost:3001/user`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err?.message);
      });
    const data = res?.data?.user;
    return data;
  };

  useEffect(() => {
    handleUserReq().then((data) => {
      if (data) {
        console.log(data);
        dispatch(authActions.reciveUser(data));
        dispatch(authActions.signin());
      } else {
        console.log("dklfdlkfmksfdsfdfd");
        // when time completed then also update the localstorage false
        JSON.parse(localStorage.getItem("userAvilable"));
        localStorage.setItem("userAvilable", JSON.stringify(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          element={!userAvailable ? <SignUp /> : <Navigate to="/" />}
          path="/signup"
        />

        {/* Add a Route for /signin when the user is NOT logged in */}
        <Route
          element={!userAvailable ? <SignIn /> : <Navigate to="/" />}
          path="/signin"
        />

        <Route
          element={userAvailable ? <UserProfile /> : <Navigate to="/signin" />}
          path="/profile"
        />
        {/* <Route
          element={userAvailable ? <EditPage /> : <Navigate to="/signin" />}
          path="/edit"
        /> */}
        <Route
          element={userAvailable ? <Home /> : <Navigate to="/signin" />}
          path="/"
        />
      </Routes>
    </>
  );
};
