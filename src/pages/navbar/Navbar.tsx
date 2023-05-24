import React from 'react';

import { Link } from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks'
// import { useSelecto r } from "react-redux";



export function Navbar() {

    const token=document.cookie;
 
   
    const LanguageData=useAppSelector((state) => { 
      return state.languageSelection;
    });
  console.log('LanguageData::: ', LanguageData);

    return (
        
      
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" >{LanguageData['financetracker']}</a>
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
        {token?<Link className="nav-link active" aria-current="page" to="/all-transaction/add-transaction">{LanguageData['addTransaction']}</Link>:""}
        </li>
        <li className="nav-item">
        {token? <Link className="nav-link active" aria-current="page" to="/all-transaction/view-transaction">{LanguageData['transactionTable']}</Link>:""}
        </li>
        

      </ul>
     
    </div>
  </div>
</nav>
     
        
       )
}

