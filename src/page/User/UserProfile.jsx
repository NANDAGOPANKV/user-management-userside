import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

axios.defaults.withCredentials = true;
export const UserProfile = () => {
  const userData = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  console.log(userData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUserInfo = () => {
    JSON.parse(localStorage.getItem("user"));
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("uid", userData?._id);

    setImage(selectedFile);

    // Send the image to the backend
    axios
      .post("http://localhost:3001/upload", formData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Image uploaded successfully");
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="min-w-[500px] w-full h-[600px] py-10 px-7 gird text-white bg-black">
      <div className="w-[30%] h-[50px]">
        <Link to={"/"} className="border-2 w-[30%] p-3 rounded font-semibold">
          Go Home
        </Link>
      </div>
      <p className="cursor-default">About.</p>
      <div className="w-[70%] h-[80%] p-2 border-2 ">
        <img
          className="rounded-full w-[30%] xl::w-[10%] sm:p-4 object-cover"
          src={`http://localhost:3001/images/${userData?.profileImage}`}
          alt="no images"
        />
        <div className="w-[100%] h-[65%] border-2 p-5 flex justify-between cursor-default">
          <div>
            <p>{userData?.name}</p>
            <p>{userData?.email}</p>
          </div>
          <div>
            <input required type="file" onChange={handleFileChange} />
            <button
              className="border-2 hover:bg-green-300 hover:text-black font-bold p-2 rounded transition duration-700"
              onClick={handleFileUpload}
            >
              Upload Image
            </button>
          </div>
          <div>
            <Link to="/edit">
              <BiEdit className="cursor-pointer" size={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
