import React from 'react';  
import ReactDOM from 'react-dom';  
import {
  BrowserRouter,
  Routes ,
  Route
} from "react-router-dom";
import App from "./App"
import EditPayroll from './components/main/payroll/EditPayroll';
import BankPayroll from './components/main/payroll/BankPayroll';
import BankPayrolls from './components/main/payroll/BankPayrolls';
import Letter from './components/main/letters/Letters';
function MyRoutes() {
    return (
      <BrowserRouter>
      <Routes>
        {/* Payroll */}
      <Route path="/" element={<App />} />
      <Route path="/edit/:id" element={<EditPayroll/>} />
      <Route path="/bank/:id" element={<BankPayroll />} />
      <Route path="/banks/" element={<BankPayrolls />} />

      {/*  */}
      <Route path='/letters/' element={<Letter />}/>
      </Routes>
    </BrowserRouter>
    );
  }
  export default MyRoutes