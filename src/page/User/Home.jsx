import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
export const Home = () => {
  const isLoggedIn = useSelector((state) => state?.isLoggedIn);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  const signOutRequest = async () => {
    const res = await axios.post("http://localhost:3001/signout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res;
    }
    let err = "Unable To LogOut. please try again";
    return err;
  };

  const handleSignOut = () => {
    signOutRequest()
      .then((res) => {
        console.log("user signed out", res);
        // setting user not available on localStorage
        JSON.parse(localStorage.getItem("userAvilable"));
        localStorage.setItem("userAvilable", JSON.stringify(false));
        dispatch(authActions.signout());
        dispatch(authActions.notAvailable());
      })
      .then(() => history("/signin"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-w-[370px] w-full h-[470px] py-4 px-1 text-white bg-black">
      <div className="grid gap-2 grid-flow-col">
        {!isLoggedIn && (
          <Link
            className="border-2 w-[30%] px-3  rounded py-1 font-semibold  "
            to={"/signin"}
          >
            {" "}
            SignIn{" "}
          </Link>
        )}
        {isLoggedIn && (
          <Link
            onClick={handleSignOut}
            className="border-2 w-[30%] px-3 rounded py-1 font-semibold"
          >
            {" "}
            SignOut{" "}
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            className="border-2 w-[30%] px-3 rounded py-1 font-semibold"
            to={"/signup"}
          >
            {" "}
            SignUp{" "}
          </Link>
        )}
      </div>
      <div className="py-5 px-3 font-bold whitespace-pre-line flex text-center gap-1 mb-5">
        <p className="font-mono font-extrabold text-2xl capitalize">
          welcome :
        </p>
        <p className="font-mono font-extrabold text-2xl capitalize">
          {userData?.name}
        </p>
      </div>
      <Link
        to={"/profile"}
        className="border-2 w-[30%] p-3 rounded font-semibold"
      >
        Go Profile
      </Link>
    </div>
  );
};
