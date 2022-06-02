import { env } from "process";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ProtectedLayout } from "../components/ProtectedLayout";
import api from "../services/api";

function App() {

  // useEffect(() => {
  //     var data = api.get('/api/Authentication');
  //     console.log(data);
  // }, []);

  return (
    <>
    <ProtectedLayout />
    <Outlet />
    </>
  );
}

export default App;
