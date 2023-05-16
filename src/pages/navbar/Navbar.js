import React from 'react';

import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";

export function Navbar(props) {

    const token=document.cookie;
   


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
       {token?"":<Link className="nav-link active" aria-current="page" to="/register">Register</Link>} 
        </li>
        <li className="nav-item">
        {token?"":  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>}
        </li>
        <li className="nav-item">
        {token?<Link className="nav-link active" aria-current="page" to="/all-transaction/add-transaction">Add Transaction</Link>:""}
        </li>
        <li className="nav-item">
        {token? <Link className="nav-link active" aria-current="page" to="/all-transaction/view-transaction">Transaction table</Link>:""}
        </li>
        

      </ul>
     
    </div>
  </div>
</nav>
     
        
       )
}

