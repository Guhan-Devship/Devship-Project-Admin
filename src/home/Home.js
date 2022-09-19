import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../Component/Dashboard";
import Navbar from "../Component/Navbar";

function Home() {
  return (
    <>
      {/* <Dashboard /> */}
      <Outlet />
    </>
  );
}

export default Home;
