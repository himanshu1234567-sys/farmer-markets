import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({
    auth,
    redirectPath = '/',
    children,
  }) => {
    if (!auth) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };