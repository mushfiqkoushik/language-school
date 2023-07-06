import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  

  return (
    <div>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="m-10 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
