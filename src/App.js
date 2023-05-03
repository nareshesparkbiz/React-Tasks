// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {AddTransaction} from './pages/add_transaction';
import {UpdateTransaction} from './pages/Update-Transactions';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import {Navbar} from './pages/navbar/components/Navbar';
import {ShowTable} from './pages/showTable';
import {View} from './pages/view_transaction';
import {RegisterMain} from './pages/registration';
import {LoginMain} from './pages/login';
import {Protected} from './pages/authentication/components/Protected';
import {Logout} from './pages/logout/component/Logout';
function App() {
  return (
  <>
  
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/register" element={<RegisterMain/>}/>
    <Route path="/login" element={<Protected Component={LoginMain}/>}/>
    

      <Route path="/" element={<Protected Component={AddTransaction}/>}/>
      <Route path='/show-table' element={<Protected Component={ShowTable}/>}/>
      <Route path="/all-transaction/:id" element={<Protected Component={View}/>}/>
      <Route path="/all-transaction/edit-transaction/:id" element={<Protected Component={UpdateTransaction}/>}/>
      
   
      <Route path="/logout" element={<Logout/>}/>




      

    </Routes>
    
    </BrowserRouter>
   
  </>
  );
}

export default App;
