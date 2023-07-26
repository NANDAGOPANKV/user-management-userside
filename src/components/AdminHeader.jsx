import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";

axios.defaults.withCredentials = true;
export const AdminHeader = () => {
  const navigate = useNavigate();
  const signOutRequest = async () => {
    const res = await axios.post("http://localhost:3001/adminsignout", null, {
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
        console.log(res?.data?.message, "succges");
        JSON.parse(localStorage.getItem("adminAvailable"));
        localStorage.setItem("adminAvailable", JSON.stringify(false));
      })
      .then(() => navigate("/admin/signin"))
      .catch((err) => {
        console.log(err, "sorry");
      });
  };
  return (
    <div className="w-full h-min-[30px] h-[100px]  bg-black text-white ">
      <div className="w-full h-full px-9  flex justify-between items-center text-center">
        <div className="cursor-default font-sans font-extrabold antialiased">
          <Link to={"/"} className="uppercase">
            manager
          </Link>
        </div>
        <div className="cursor-default">
          <input
            className="px-7 py-2 rounded-full text-black border-none"
            type="text"
            placeholder="Enter book name"
          />
        </div>
        <div className="gap-2">
          <Link to={"/admin/signin"}>signin,</Link>
          <button onClick={handleSignOut}>signout</button>
        </div>
        <div>
          <MdAccountCircle size={30} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
