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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(users);

  return (
    <>
      <AdminHeader />
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
