
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

export function Navbar(props) {

  const [checklogin,setcheckLogin]=useState();

  useEffect(()=>{
    const localData=localStorage.getItem('auth_token');

    console.warn(localData,"warnin sdfsdfsdfsdfsdf")
    setcheckLogin(localData)
  },[])
  
console.log(checklogin,"check login")

    return (
        
      
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" >Finance Tracker</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
       {checklogin!=undefined?"":<Link className="nav-link active" aria-current="page" to="/register">Register</Link>}   
        </li>
        <li className="nav-item">
         {checklogin!=undefined?"":<Link className="nav-link active" aria-current="page" to="/login">Login</Link>} 
        </li>
        <li className="nav-item">
        {checklogin!=undefined?  <Link className="nav-link active" aria-current="page" to="/">Add Transaction</Link>:""}
        </li>
        <li className="nav-item">
        {checklogin!=undefined? <Link className="nav-link active" aria-current="page" to="/show-table">Transaction table</Link>:""}
        </li>
        

      </ul>
     
    </div>
  </div>
</nav>
     
        
       )
}

