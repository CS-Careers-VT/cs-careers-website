import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
