import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function UseGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allUsers", {
          Credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers:" + error);
      }
    };
    getAllUsers();
  }, []);

  return [allUsers, loading];
}

export default UseGetAllUsers;
