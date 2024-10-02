import React from "react";
import Search from "./Search";
import Logout from "./Logout";
import Users from "./Users";

//  className="flex-1 overflow-y-auto"
// style={{ minHeight: "calc(84vh - 10vh)" }}
function Left() {
  return (
    <div className="w-full bg-black text-gray-300">
      <Search />
      <div
        className="flex-1 overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>

      <Logout />
    </div>
  );
}

export default Left;
