import {useContext} from "react";
import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom";

function PrivateRoute({children}) {
    const {token, isLoading, isError, isAuthenticated} = useSelector(
        (store) => store.authReducer
      );
     // console.log("private route",token,isAuthenticated)
     return children;
   
}

export default PrivateRoute;
