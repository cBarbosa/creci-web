import React from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/layouts/SideNav";

function App() {

  // useEffect(() => {
  //     var data = api.get('/api/Authentication');
  //     console.log(data);
  // }, []);
  
  return (
    <>
      <div className="flex">
        <SideNav />
        <div className="h-screen flex-1 p-7">

          <h1 className="text-2xl font-semibold ">Home Page</h1>
          <Outlet />

        </div>
      </div>
    </>
  );
}

export default App;
