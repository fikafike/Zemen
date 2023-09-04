import React from "react";
import Swal from 'sweetalert2';

import { Link, useParams } from "react-router-dom"
import "./EditPayroll.css"

function EditPayroll(){


  const employeeName=React.useRef()
  const employeeAge=React.useRef()
  const employeeBasicSalary=React.useRef()
  const workingDays=React.useRef()
  const overtime=React.useRef()
  const bonus =React.useRef()
  const houseAllowance=React.useRef()
  const prediem=React.useRef()
  const transportAllowancePrediem=React.useRef()
  const transportAllowance=React.useRef()
  const telephoneAllowance=React.useRef()
  const social=React.useRef()
  const loan=React.useRef()
  const bankAccount=React.useRef()
  const costSharing=React.useRef()
  const penality=React.useRef()
  const grossSalary=React.useRef();


  const {id}=useParams();
  const [employee,setEmployees]=React.useState({});
  
  const fetchUserData = () => {
    fetch(`http://157.245.240.123:8000/api/payroll/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setEmployees(data)
      }).catch(e=>{
        console.log(e)
      })
  }

  const SubmitUser=()=>{
   
    const new_employee = {
      "employee_name": employeeName.current.value === '' ? employee.employee_name : employeeName.current.value,
        "age": employeeAge.current.value === '' ? employee.age : employeeAge.current.value,
        "basic_salary": employeeBasicSalary.current.value === '' ? employee.basic_salary : employeeBasicSalary.current.value,
        "working_days": workingDays.current.value === '' ? employee.working_days : workingDays.current.value,
        "overtime": overtime.current.value === '' ? employee.overtime : overtime.current.value,
        "bonus": bonus.current.value === '' ? employee.bonus : bonus.current.value,
        "house_allowance": houseAllowance.current.value === '' ? employee.house_allowance : houseAllowance.current.value,
        "prediem": prediem.current.value === '' ? employee.prediem : prediem.current.value,
        "transport_allowance_prediem": transportAllowancePrediem.current.value === '' ? employee.transport_allowance_prediem : transportAllowancePrediem.current.value,
        "transport_allowance": transportAllowance.current.value === '' ? employee.transport_allowance : transportAllowance.current.value,
        "telephone_allowance": telephoneAllowance.current.value === '' ? employee.telephone_allowance : telephoneAllowance.current.value,
        "gross_salary": employee.gross_salary,
        "taxable_income": employee.taxable_income,
        "tax_by_number": employee.tax_by_number,
        "tax_by_percent": employee.tax_by_percent,
        "pensions": employee.pensions,
        "cost_sharing": costSharing.current.value === '' ? employee.cost_sharing : costSharing.current.value,
        "social": social.current.value === '' ? employee.social : parseInt(social.current.value),
        "loan": loan.current.value === '' ? employee.loan : parseInt(loan.current.value),
        "penality": penality.current.value === '' ? employee.penality : parseInt(penality.current.value),
        "bank_account": bankAccount.current.value===''?employee.bank_account:parseInt(bankAccount.current.value),
        "total_deduction": employee.total_deduction,
        "net_pay": employee.net_pay
    };

      console.log(new_employee);
      
    fetch(`http://157.245.240.123:8000/api/payroll/${employee.id}/`, {
      method: 'PUT',
      body: JSON.stringify(new_employee),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((res) => res.json())
      .then((employee) => {
         console.log(employee)
         Swal.fire({
          title: 'Success',
          text: 'Employee updated successfully',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Go back',

        }).then((result) => {
         
          if (result.isConfirmed) {
            window.location.reload(false);
          } else if (result.isDismissed) {
            window.history.back();

          }
         
        });

            })
      .catch((err) => {
         console.log(err.message);
      });
      
  
  }

console.log(employee)
  React.useEffect(() => {
    fetchUserData();
    
  }, []);
    return <>
    <div className="container card rounded bg-white mt-5 mb-5">
    <div className="mt-5 card-header">
    <Link to={`/`}> <button className="btn btn-dark" >Go Back</button></Link>
         
        </div>
          <div className="row">
      <div className="">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 contentEditable="true" className="text-right">Profile Settings</h4>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <label className="labels">Name</label>
              <input ref={employeeName} type="text" className="form-control" placeholder={employee.employee_name} />
            </div>
            
          </div>
          
          <div className="row mt-2">
            <div className="col-md-12">
              <label className="labels">Age</label>
              <input ref={employeeAge} type="text" className="form-control" placeholder={employee.age} />
            </div>
            
          </div>
          
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Basic Salary</label>
              <input ref={employeeBasicSalary} type="number" className="form-control" placeholder={employee.basic_salary}   />
            </div>
            <div className="col-md-6">
              <label className="labels">Working Days</label>
              <input ref={workingDays} type="number" className="form-control"   placeholder={employee.working_days} />
            </div>
          </div>

          
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Overtime</label>
              <input ref={overtime} type="number" className="form-control" placeholder={employee.overtime}  />
            </div>
            <div className="col-md-6">
              <label className="labels">Bonus</label>
              <input ref={bonus} type="number" className="form-control"  placeholder={employee.bonus} />
            </div>
          </div>

          
          
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">House Allowance</label>
              <input ref={houseAllowance} type="number" className="form-control" placeholder={employee.house_allowance}/>
            </div>
            <div className="col-md-6">
              <label className="labels">Transport Allowance</label>
              <input ref={transportAllowance} type="number" className="form-control"  placeholder={employee.transport_allowance} />
            </div>
          </div>

          
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Prediem</label>
              <input ref={prediem} type="number" className="form-control" placeholder={employee.prediem} />
            </div>
            <div className="col-md-6">
              <label className="labels">Telephone Allowance</label>
              <input ref={telephoneAllowance} type="number" className="form-control"   placeholder={employee.telephone_allowance} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <label className="labels">Transport Allowance  መዘዋወሪያ</label>
              <input ref={transportAllowancePrediem} type="number" className="form-control" placeholder={employee.transport_allowance_prediem} />
            </div>
           
          </div>


          <div className="row mt-6">
             
            <div className="col-md-12">
              <label className="labels">Cost Sharing</label>
              <input ref={costSharing}  type="number" className="form-control"   placeholder={employee.cost_sharing} />
            </div>
          </div>



          <div className="row mt-3">
            <div className="col-md-6">
              <label className="labels">Social</label>
              <input ref={social} type="number" className="form-control" placeholder={employee.social} />
            </div>
            <div className="col-md-6">
              <label className="labels">Loan</label>
              <input ref={loan} type="number" className="form-control"   placeholder={employee.loan} />
            </div>
          </div>

          <div className="row mt-6">
            <div className="col-md-12">
              <label className="labels">Penality</label>
              <input ref={penality} type="number" className="form-control" placeholder={employee.penality} />
            </div>
            
          </div>
          <div className="row mt-6">
            <div className="col-md-12">
              <label className="labels">Bank Account</label>
              <input ref={bankAccount} type="number" className="form-control" placeholder={employee.bank_account} />
            </div>
            
          </div>

          <div className="mt-5 text-center">
            <button className="btn btn-primary profile-button" onClick={SubmitUser}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
</div>
    </>

}
export default EditPayroll