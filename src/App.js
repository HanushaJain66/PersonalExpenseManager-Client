import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './Component/Signup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login';
import Addacc from './Component/Addacc';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/account' element={<Addacc/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
