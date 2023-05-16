import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/styles/Logout.css'
import { useSelector,useDispatch } from "react-redux";
import {removeToken } from '../../redux/stores/slices/authUserSlice'

export const Logout = () => {

  const navigate = useNavigate();  //Navigation

  const userRegisterData = useSelector((state) => {   //Selector
    return state.authUser;
  });

// console.log(userRegisterData,"redux data in login");

const dispatch=useDispatch()             //Dispatcher

//Logout handler
  const logoutHandler = () => {

    const latestUser=[];

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
        alert("Logout Succesfully")
        
        navigate("/login");
    }
    
  };
 
  return (
    <div>
      

<button className="button-5" role="button" onClick={logoutHandler}>Logout</button>
    </div>
  );
};
