import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/styles/Logout.css'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {removeToken } from '../../redux/stores/slices/authUserSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../utils/helper'


interface typeLogout{
  lang: string;
}
export const Logout = (props:typeLogout) => {

  const navigate = useNavigate();  //Navigation

  const userRegisterData = useAppSelector((state) => {   //Selector
    return state.authUser;
  });

// console.log(userRegisterData,"redux data in login");

const dispatch=useAppDispatch()             //Dispatcher

//Logout handler
  const logoutHandler = () => {

    const latestUser:string[]=[];

    const reply= window.confirm('Are you sure you want to logout?');

    if(reply){
        document.cookie = "authToken"+ '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        for(let i in userRegisterData){
            if(userRegisterData[i].token!=""){
                let newData={...userRegisterData[i],token:""}
                // userRegisterData[i]=newData;
                // userRegisterData.splice(i,1,newData)
                latestUser.push(newData)
                // console.log(latestUser,"new================================asdddddddddddddda")
            }
            else{
                latestUser.push(userRegisterData[i])
            }
        }
        // console.log(latestUser,"logout data")
        dispatch(removeToken(latestUser))
        notify("Logout Successfully")
        
        
       setTimeout(()=>{navigate("/login");},2000) 
    }
    
  };
 
  return (
    <div>
      

<button className="button-5" role="button" onClick={logoutHandler}>{props.lang}</button>
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
  );
};
