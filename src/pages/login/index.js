import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import {Navbar} from '../../pages/navbar/components/Navbar';


export const LoginMain = () => {

useEffect(()=>{
    
},[])
  const navigate = useNavigate();

  return(
    <>
    <Navbar/>
    <Login />;
    </>
  ) 
};
