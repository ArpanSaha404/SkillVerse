import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// const GuardeddRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

//   if (isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

export default ProtectedRoutes;
