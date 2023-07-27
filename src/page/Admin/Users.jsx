import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = (props) => {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`edit/${props?._id}`);
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:3001/admin/${props?._id}`)
      .then((res) => {
        console.log(res);
        navigate("/admin/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Axios Working");
      });
  };

  return (
    <>
      <div className="m-3">
        <div className="bg-black h-[300px] sm:w-[270px] p-[0.1rem]">
          <div className="relative h-[50%]">
            <img
              className="w-full h-[100%] border-2 border-solid border-white object-cover p-1"
              src={`http://localhost:3001/images/${props?.profileImage}`}
              alt="no images"
            />
            <div className="absolute left-3 top-2 text-white">
              <BiEdit
                onClick={handleUpdate}
                size={30}
                className="hover:text-black"
              />
              <AiOutlineDelete
                onClick={handleDelete}
                size={30}
                className="hover:text-black"
              />
            </div>
          </div>
          <div className="grid gap-2 w-full h-[50%] text-white font-semibold p-4">
            <p className="capitalize">{props.name}</p>
            <p className="capitalize">{props.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};
