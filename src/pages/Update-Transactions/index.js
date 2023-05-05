import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Form} from '../add_transaction/components/Form';
import {Navbar} from '../../pages/navbar/components/Navbar'

export const UpdateTransaction=()=>{
 const location=useLocation();

 const editData=location.state;
 console.log(editData,"edit data")
 

 
    return(
        <>
        <Navbar/>
           <Form data={editData}/>
        </>
     
    )
   
 



};