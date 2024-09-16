
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

 function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
console.log(currentUser); // Add this to check the user data


return currentUser?<Outlet/> :<Navigate to ='/sign-in' />
  
}
export default PrivateRoute;
