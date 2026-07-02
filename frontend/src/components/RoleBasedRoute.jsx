import { Navigate } from "react-router-dom";

function RoleBasedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RoleBasedRoute;