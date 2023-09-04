import { Link, useParams } from "react-router-dom"
import { Table, Pagination } from 'react-bootstrap';

import React from "react"

function BankPayroll(){
    

  const [isShow, setIsShow] = React.useState(false)

  const {id}=useParams();
  const [employee,setEmployees]=React.useState({});
  
  const fetchUserData = () => {
    fetch(`http://127.0.0.1:8000/api/payroll/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setEmployees(data)
      }).catch(e=>{
        console.log(e)
      })
  }


console.log(employee)
  React.useEffect(() => {
    fetchUserData();
    
  }, []);

  return (
    <>

<div className="container card p-2 ">
      
      <div class="card-header">
        <h3>Bank Account</h3>
      </div>
      <div className="card-body table-responsive">
  
      <table striped bordered hover
      
      className="table table-lg table-striped font"
      >
        <thead  className="table-dark ">
          <tr>
            <th>ID</th>
            <th> Full Name</th>
            <th>Bank Account</th>
            <th>Amount to  Transfer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {employee.id}
            </td>
            <td>
              {employee.employee_name}
            </td>
            <td>
              {employee.bank_account}
            </td>
            
            <td>
              {employee.net_pay}
            </td>
          </tr>
        </tbody>
      </table>
     
   <Link to={`/`}>  <button className="btn btn-primary btn-sm">Go back</button></Link>
   </div>
   </div>
  
    </>
  );
}
export default BankPayroll