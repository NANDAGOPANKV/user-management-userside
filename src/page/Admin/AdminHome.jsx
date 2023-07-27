import React, { useEffect, useState } from "react";

import { AdminHeader } from "../../components/AdminHeader";
import { Users } from "./Users";
import axios from "axios";

export const AdminHome = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/admin")
      .then((res) => {
        setUsers(res?.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setUsers]);

  const handleSearch = (event) => {
    let searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      setUsers(users);
    } else {
      let updatedUser = users.filter((items) =>
        items?.name?.toLowerCase().includes(searchTerm)
      );
      setUsers(updatedUser);
    }
  };
  return (
    <>
      <AdminHeader />
      {/* search */}
      <div className="cursor-default border-2">
        <input
          className="px-7 py-2 rounded-full text-black border-none"
          onChange={handleSearch}
          type="text"
          placeholder="Enter book name"
        />
      </div>
      {/* search */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {/* User/Cards */}
        {users?.map((data, key) => {
          return <Users key={key} {...data} />;
        })}
        {/* User/Cards */}
      </div>
    </>
  );
};
