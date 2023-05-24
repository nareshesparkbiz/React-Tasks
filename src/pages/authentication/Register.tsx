
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm ,FieldValues} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {Navbar} from '../navbar/Navbar' 
import {addUser} from "../../redux/stores/slices/authUserSlice";

import { registerSchema } from "../../utils/validation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify,alertnotify} from '../../utils/helper'
import FormField from '../../components/FormFiels'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'




 const Register = () => {



const navigate = useNavigate();   //Navigation
interface stateProps{
    state:{
        authUser:[]
    }[]
}
const userRegisterData = useAppSelector((state) => {    // use of Selector
    return state.authUser;
  });

 

const dispatch=useAppDispatch()  // dispatch

type FormValues = {
    name: string;
    email: string;
    password: string;
    respassword: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } =  useForm<FieldValues>({ resolver: yupResolver(registerSchema), mode: "all" });   // useFormState


// form submit handler
  const formSubmit =handleSubmit((data) => {
    
    

    interface userType{
        id?:number,
        user:{
            email?:string,

        },
        token?:string,
    }
    let userData:userType={
   
      user:{}

    }

    if(userRegisterData.length>0){
       let checkUser= userRegisterData.filter((user:userType)=>user.user.email===data.email)
        if(checkUser.length>0){
           
            alertnotify('Email already registered')
          
            
        }
        else{
            let previd = userRegisterData.at(userRegisterData.length-1).id;
            // console.log("previous id",previd);
            userData['id']=previd+1;
            userData['user']=data
            userData['token']=""
            notify("🦄 Register SuccesFully ")
            dispatch(addUser(userData))
            // navigate("/login")
            setTimeout(()=>{
              navigate("/login")
            },3000)
           


            
        }


    }
    else{
      
        userData['id']=1
        userData['user']=data
        userData['token']=""
        
        notify('🦄 Register SuccesFully ')
        dispatch(addUser(userData))
        // navigate("/login")
        setTimeout(()=>{
          navigate("/login")
        },3000)
      
        
        
    }
 
    reset()


  });


  return (
    <>
   
   <Navbar/>
      <div className="container">

<section className="vh-100"style={{backgroundColor: "#ee"}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black"style={{borderRadius: '25px'}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>


        
        <form  className="mx-1 mx-md-4" onSubmit={formSubmit}>
      
          {FormField("name","text","Enter name",[register,errors],"Name")}
          {FormField("email","email","Enter Email",[register,errors],"Email")}
          {FormField("password","password","Enter Password",[register,errors],"Password")}
          {FormField("respassword","password","Confirm Password",[register,errors],"Confirm password")}



          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    
          {FormField("submit","button","Register",[register,errors])}

                    </div>

        
        </form>
      </div>
      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    
   
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>
    
                  </div>
                </div>
                <div className="toast-container">  <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      /></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    </div>
    </>
    
  );
};


export default Register;