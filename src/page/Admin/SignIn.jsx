import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authActions } from "../../redux/store";

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
        "http://localhost:3001/adminsignin",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );

      const credentials = response?.data?.admin;

      console.log(credentials, "kdjhkjdfhdkj");
      localStorage.setItem("adminAvailable", true);
    } catch (error) {
      if (error?.response?.status === 401) {
        // Unauthorized status code
        notify(error?.response?.data?.message); // Show an error toast for invalid credentials
      } else {
        notify("An error occurred. Please try again later"); // Show a general error toast for other errors
      }
      return error;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest().then(() => {
      console.log("sdlkfdkjnfkjdnfjkfdkjndkfjvndfkjnvfkdjvndfkjnvdfkjvn");
      dispatch(authActions.adminSignIn());
      navigate("/admin/");
    });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-black mt-[-1.5%] pt-[4%] w-full h-[500px] ">
      <ToastContainer />
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
      </form>
    </div>
  );
};
