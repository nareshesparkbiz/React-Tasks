import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {

    const reply= window.confirm('Are you sure you want to logout?');

    if(reply){
        localStorage.removeItem("auth_token");
        navigate("/login");
    }
    
  };
 
  return (
    <div>
      

<button className="button-5" role="button" onClick={logoutHandler}>Logout</button>
    </div>
  );
};
