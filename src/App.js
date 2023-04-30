// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {AddTransaction} from './pages/add_transaction';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import {Navbar} from './pages/navbar/components/Navbar';
import {ShowTable} from './pages/showTable';
import {View} from './pages/view_transaction';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path="/" element={<AddTransaction/>}/>
      <Route path='/show-table' element={<ShowTable/>}/>
      <Route path="/all-transaction/:id" element={<View/>}/>

      

    </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
