import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AdminUserEdit = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  // const [existingUser, setExistingUser] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3001/update/${id}`, {
        name: user?.name,
        email: user?.email,
      })
      .then((res) => {
        console.log(res);
        if (res?.status) {
          navigate("/admin/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((res) => {
        setUser(res.data?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[80%] sm:w-[50%] md:w-[40%] h-[70%] p-10 flex gap-1 border-2 rounded-md flex-col m-4 bg-black"
      >
        <input
          className="px-3 py-2 rounded"
          type="text"
          name="name"
          placeholder="Name..."
          required
          value={user.name}
          onChange={handleChange}
        />
        <br />
        <input
          className="px-3 py-2 rounded"
          type="email"
          name="email"
          placeholder="Email..."
          required
          value={user.email}
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
