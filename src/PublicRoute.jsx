import { Navigate } from "react-router-dom";
 const PublicRoute = ({
    auth,
    redirectPath = '/dashboard',
    children,
  }) => {
    if (auth) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };
  export default PublicRoute