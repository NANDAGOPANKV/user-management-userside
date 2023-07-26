import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const notify = (msg) => toast(msg);

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return response.data; // Return the data on successful signup
    } catch (err) {
      const error = err?.response?.status;
      if (error === 409) {
        notify(err?.response?.data?.message);
      }
      throw err?.response?.data?.message; // Throw the error message on signup failure
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
    console.log(user);
    sendRequest()
      .then(() => history("/signin")) // Only navigate to "/signin" on successful signup
      .catch((err) => {
        console.log("Error", err); // Handle the error separately without navigating to "/signin"
      });
  };

  return (
    <div className="min-w-[370px] w-full h-full">
      <ToastContainer />
      <div className="min-w-[370px] w-full h-[470px] bg-black">
        <h1 className="text-white  text-3xl font-bold px-6 py-2">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="w-[80%] sm:w-[50%] md:w-[40%] h-[70%] p-10 flex gap-1 border-2 rounded-md flex-col m-4"
        >
          <input
            className="px-3 py-2 rounded"
            type="text"
            name="name"
            placeholder="Name..."
            value={user.name}
            onChange={handleChange}
          />
          <br />
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
            className="text-white border-2 rounded"
            type="submit"
            value={"Submit"}
          />
          <p className="text-white py-2">
            Already have account{" "}
            <Link to={"/signin"} className="text-gray-300">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
