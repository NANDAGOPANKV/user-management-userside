import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authActions } from "../../redux/store";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const notify = (msg) => toast(msg);

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/signin",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
      const credentials = response?.data?.user;
      return credentials;
    } catch (err) {
      const error = err?.response?.status;
      console.log(err);
      if (error === 401) {
        // Unauthorized status code
        notify("Invalid email or password"); // Show an error toast for invalid credentials
      } else {
        notify("An error occurred. Please try again later"); // Show a general error toast for other errors
      }
      throw err; // Re-throw the error to handle it outside of this function if needed
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => {
        dispatch(authActions.reciveUser(data));
      })
      .then((data) => {
        dispatch(authActions.signin());
        // setting user available on localStorage
        localStorage.setItem("userAvilable", true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-w-[370px] w-full h-full">
      <ToastContainer />
      <div className="min-w-[370px] w-full h-[400px] bg-black">
        <h1 className="text-white  text-3xl font-bold py-3 px-6">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="w-[80%] sm:w-[50%] md:w-[40%] h-[70%] p-10 flex gap-1 border-2 rounded-md flex-col m-4"
        >
          <input
            className="px-3 py-2 rounded"
            type="email"
            name="email"
            placeholder="Email..."
            value={user.email}
            onChange={handleChange}
          />
          <br />
          <input
            className="px-3 py-2 rounded"
            type="password"
            name="password"
            placeholder="Password..."
            value={user.password}
            onChange={handleChange}
          />
          <br />
          <input
            className="text-white border-2 rounded px-3  "
            type="submit"
            value={"Submit"}
          />
          <p className="text-white py-3">
            Don't have an account{" "}
            <Link to={"/signup"} className="text-gray-300">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
