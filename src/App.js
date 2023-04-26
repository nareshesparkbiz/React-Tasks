import logo from './logo.svg';
import './App.css';
import {AddTransaction} from './pages/add_transaction';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import {Navbar} from './pages/navbar/components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path="/" element={<AddTransaction/>}/>
      

    </Routes>
    
    </BrowserRouter>
   
  );
}

export default App;
