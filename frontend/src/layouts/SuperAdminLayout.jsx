
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SuperAdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLayout;