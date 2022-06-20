import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNavbar } from "./components/layouts/BottomNavbar";
import { TopNavbar } from "./components/layouts/TopNavbar";

function App() {
  
  return (
    <>
      <TopNavbar />
      <div className="min-h-[55vh] md:min-h-[75vh]">
        <Outlet />
      </div>
      <BottomNavbar />
    </>
  );
}

export default App;
