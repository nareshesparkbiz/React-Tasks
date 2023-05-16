

import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {Navbar} from '../navbar/Navbar' 
import {addUser} from "../../redux/stores/slices/authUserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerSchema } from "../../utils/validation";



 const Register = () => {

const navigate = useNavigate();   //Navigation
const userRegisterData = useSelector((state) => {    // use of Selector
    return state.authUser;
  });



const dispatch=useDispatch()  // dispatch



  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema), mode: "all" });   // useFormState


// form submit handler
  const formSubmit = (data) => {

    let userData={}

    if(userRegisterData.length>0){
       let checkUser= userRegisterData.filter((user)=>user.user.email===data.email)
        if(checkUser.length>0){
            alert("Email already registered")
          
            reset()
        }
        else{
            let previd = userRegisterData.at(userRegisterData.length-1).id;
            // console.log("previous id",previd);
            userData['id']=previd+1;
            userData['user']=data
            userData['token']=""
            dispatch(addUser(userData))
            alert("Register Succesfully!")
           


            
        }


    }
    else{
        userData['id']=1
        userData['user']=data
        userData['token']=""
        dispatch(addUser(userData))
        alert("Register Succesfully!")
        
        
    }
    navigate("/login")
    reset()


  };

  //Form Field Generator
  const FieldGenerator = (value, type) => {
    return (


       <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">

        <label htmlFor={value} className="form-label">Enter {value}</label>
        <input
          name={value}
          {...register(`${value}`)}
          type={type}
          className="form-control" 
          placeholder={value}
        />
            <div i className="form-text text-danger"> {errors[value]?.message}</div>
     
      </div>
      </div>
                   
                   
 
    );
  };



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


        
        <form  className="mx-1 mx-md-4" onSubmit={handleSubmit((e) => formSubmit(e))}>
          {FieldGenerator("name", "text")}

          {FieldGenerator("email", "email")}

          {FieldGenerator("password", "password")}

          {FieldGenerator("respassword", "password")}

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    </div>

        
        </form>
      </div>
      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    
   
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>
    
                  </div>
                </div>
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