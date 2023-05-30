import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addLanguage } from "../../redux/stores/slices/languageSelection";
import logo from "../../assets/images/logo.png";
import { addselectedLang } from "../../redux/stores/slices/selectedLang";


export function Navbar() {
  const dispatch = useAppDispatch();
  const token = document.cookie;
  // const[langSelect,setLangSelect]=useState<string>("English");
  const changeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let langSelect = event.target.value;
    // setLangSelect(langselect)
    

    dispatch(addselectedLang(langSelect))
    const mySelect = document.getElementById("selectLang");
    mySelect?.ariaSelected;
    dispatch(addLanguage(langSelect));
  };

  const LanguageData = useAppSelector((state) => {
    return state.languageSelection;
  });

  const selectedlang = useAppSelector((state) => {
    return state.langSelected;
  });
  


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">
        <div><img src={logo} alt="Logo" style={{height:'45px',width:"45px",margin:"0px 15px"}} /></div>
        <a className="navbar-brand">{LanguageData["financetracker"]}</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {token ? (
                ""
              ) : (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  {LanguageData["register"]}
                </Link>
              )}
            </li>
            <li className="nav-item">
              {token ? (
                ""
              ) : (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  {LanguageData["login"]}
                </Link>
              )}
            </li>
            <li className="nav-item">
              {token ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/all-transaction/add-transaction"
                >
                  {LanguageData["addTransaction"]}
                </Link>
              ) : (
                ""
              )}
            </li>
            <li className="nav-item">
              {token ? (
                <Link className="nav-link active" aria-current="page" to="/">
                  {LanguageData["transactionTable"]}
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
        <div className="dropDown">
          <select
            name="lang"
            id="lang"
            onChange={(e) => {
              changeLang(e);
            }}
          >
             {selectedlang==="English"?
          <option value="English" selected >English</option>
          :
          <option value="English"  >English</option>
        }
         
            {selectedlang==="Hindi"?
            <option value="Hindi" selected>Hindi</option>
            :
            <option value="Hindi">Hindi</option>
            }
        
       
           
          </select>
        </div>
      </div>
    </nav>
  );
}
