import React, { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.delete("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged Out Successfully");
      window.location.reload(); //when we logout then automatic we will go signup page
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in Logout");
    }
  };
  return (
    <div className="h-[10vh] bg-slate-800">
      <div>
        <RiLogoutCircleLine
          className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Logout;
