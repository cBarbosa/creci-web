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

        <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800" role="alert">
          <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
        </div>

          <Outlet />

        </div>
      </div>
    </>
  );
}

export default App;
