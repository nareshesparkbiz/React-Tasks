import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm,FieldValues } from "react-hook-form";
import { Link,useNavigate } from 'react-router-dom';
import * as yup from "yup";

import {tokenGenerator,saveToCookie,notify,alertnotify} from '../../utils/helper'


import {Navbar} from '../navbar/Navbar'
import {addToken} from "../../redux/stores/slices/authUserSlice";

  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormField from '../../components/FormFiels'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
// import '../Styles/login.css'

export const Login = () => {
 

    const userRegisterData = useAppSelector((state) => {    //selector
        return state.authUser;
      });
    
    // console.log(userRegisterData,"redux data in login");
    
    const dispatch=useAppDispatch()   //Dispatch
    const navigate=useNavigate()   // Navigate

     const loginSchema = yup.object().shape({
      email: yup.string().required().test('data',"Email not Registered",(value)=>{
          if(userRegisterData.length > 0) {
              const checkUser=userRegisterData.filter((user) =>user.user.email===value)
      
              if(checkUser.length > 0) {
                  
                  return true;
              }
        }
      }
        )
      ,
    
    password: yup.string().required(),
    });


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(loginSchema), mode: "all"
  });



  const loginHandler =handleSubmit((data) => {
    // console.log("login succesfully");
    let flag=0;
    
    if(userRegisterData.length > 0) {
        const tokenData = tokenGenerator();
        // console.log(tokenData,"Generator token")
        let newRegisterData=[...userRegisterData];
        
         for(let i in newRegisterData) {
            if(newRegisterData[i].user.email===data.email && newRegisterData[i].user.password===data.password){
                // console.log("login check email")
        
        
                // console.log(newRegisterData,"New Data ")
                
                let newData={...newRegisterData[i],token:tokenData}
                // console.log(newData,"New Data------------------- ")
            newRegisterData[i]=newData
            // console.log(newRegisterData,"New Data ")
            flag=1;
            }
            else{
                let newData={...newRegisterData[i],token:""}
                // console.log(newData,"New Data------------------- ")
            newRegisterData[i]=newData
            
                
            }


         }
               
        
        

           dispatch(addToken(newRegisterData))
           if(flag==0){
            alertnotify('Invalid Credentials')
           }
           else{

               notify('🦄 Login SuccesFully ')
               saveToCookie('authToken',tokenData)
             setTimeout(()=>{navigate("/all-transaction/view-transaction")},2000)  
               
           }
           
            
        }
        reset()

    
        


    })
   
  return (
    <>
   <Navbar/>
    <div className="container">
      <section className="vh-100" style={{ backgroundColor: "#ee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign in
                      </p>

        <form  className="mx-1 mx-md-4"  onSubmit={loginHandler}>
       
        
           {FormField("email","email","Enter Email",[register,errors],"Email")}
           {FormField("password","password","Enter Password",[register,errors],"Password")}

      

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                         {FormField("submit","button","Login",[register,errors],"Login")}
                        
                        </div>
                        
                        <div className="text-center">
                          <p>
                            Not a member? <Link to="/register">Register</Link>
                          </p>
                        </div>
        
        </form>
        </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      </section>
    </div>
    </>
  );
};

