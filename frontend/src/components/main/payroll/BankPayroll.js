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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
      </Table>
     
   <Link to={`/`}>  <button className="btn btn-primary">Go back</button></Link>
    </>
  );
}
export default BankPayroll