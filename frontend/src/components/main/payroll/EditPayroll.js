import React from "react";
import { Link, useParams } from "react-router-dom"
import "./EditPayroll.css"

function EditPayroll(){


  const [isShow, setIsShow] = React.useState(false)
  const employeeNameRefereneces=React.useRef()
  const employeeSalaryReference=React.useRef()
  const overtimeRef=React.useRef()
  const workingDaysRef=React.useRef()
  const bonusRef =React.useRef()
  const houseAllowanceRef=React.useRef()
  const predTimeRef=React.useRef()
  const transportAllowanceRef=React.useRef()
  const telephoneAllowanceRef=React.useRef()
  const grossSalaryRef=React.useRef()
  const socialRef=React.useRef()
  const loanRef=React.useRef()
  const bankAccountRef=React.useRef()
  const costSharingRef=React.useRef()
  const penalityRef=React.useRef()

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

  const SubmitUser=()=>{
    

    const new_employee={
      "employee_name": employeeNameRefereneces.current.value === ''?employee.employee_name:employeeNameRefereneces.current.value,
      "basic_salary": employeeSalaryReference.current.value === ''? employee.basic_salary:employeeSalaryReference.current.value,
      "working_days": workingDaysRef.current.value===''?employee.working_days:workingDaysRef.current.value,
      "overtime": overtimeRef.current.value===''?employee.overtime:overtimeRef.current.value,
      "bonus": bonusRef.current.value===''?employee.bonus:bonusRef.current.value,
      "house_allow": houseAllowanceRef.current.value===''?employee.house_allow:houseAllowanceRef.current.value,
      "predtime": predTimeRef.current.value===''?employee.predtime:predTimeRef.current.value,
      "transport_allowance": transportAllowanceRef.current.value===''?employee.transport_allowance:transportAllowanceRef.current.value,
      "telephone_allowance": telephoneAllowanceRef.current.value===''?employee.telephone_allowance:telephoneAllowanceRef.current.value,
      "gross_salary": grossSalaryRef.current.value===''?employee.gross_salary:grossSalaryRef.current.value,
      "taxable_income": employee.taxable_income,
      "tax": employee.tax,
      "pensions": employee.pensions,
      "cost_sharing": costSharingRef.current.value===''?employee.cost_sharing:costSharingRef.current.value,
      "social": socialRef.current.value===''?parseInt(employee.social):parseInt(socialRef.current.value),
      "loan": loanRef.current.value===''?parseInt(employee.loan):parseInt(loanRef.current.value),
      "penality": penalityRef.current.value===''?parseInt(employee.penality):parseInt(penalityRef.current.value),
      "bank_account": bankAccountRef.current.value===''?parseInt(employee.bank_account):parseInt(bankAccountRef.current.value),
      "total_deduction": employee.total_deduction,
      "net_pay": employee.net_pay
      

      
    }

    fetch(`http://127.0.0.1:8000/api/payroll/${employee.id}/`, {
      method: 'PUT',
      body: JSON.stringify(new_employee),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((res) => res.json())
      .then((employee) => {
         console.log(employee)
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
    <div className="container rounded bg-white mt-5 mb-5">
    <div className="mt-5 text-center">
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
            <input ref={employeeNameRefereneces} type="text" className="form-control" placeholder={employee.employee_name} />
          </div>
          
        </div>
        
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Basic Salary</label>
            <input ref={employeeSalaryReference} type="number" className="form-control" placeholder={employee.basic_salary}   />
          </div>
          <div className="col-md-6">
            <label className="labels">Working Days</label>
            <input ref={workingDaysRef} type="number" className="form-control"   placeholder={employee.working_days} />
          </div>
        </div>

        
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Overtime</label>
            <input ref={overtimeRef} type="number" className="form-control" placeholder={employee.overtime}  />
          </div>
          <div className="col-md-6">
            <label className="labels">Bonus</label>
            <input ref={bonusRef} type="number" className="form-control"  placeholder={employee.bonus} />
          </div>
        </div>

        
        
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">House Allowance</label>
            <input ref={houseAllowanceRef} type="number" className="form-control" placeholder={employee.house_allow}/>
          </div>
          <div className="col-md-6">
            <label className="labels">Transport Allowance</label>
            <input ref={transportAllowanceRef} type="number" className="form-control"  placeholder={employee.transport_allowance} />
          </div>
        </div>

         
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Pred time</label>
            <input ref={predTimeRef} type="number" className="form-control" placeholder={employee.predtime} />
          </div>
          <div className="col-md-6">
            <label className="labels">Telephone Allowance</label>
            <input ref={telephoneAllowanceRef} type="number" className="form-control"   placeholder={employee.telephone_allowance} typ/>
          </div>
        </div>


        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Gross Salary</label>
            <input ref={grossSalaryRef} type="number" className="form-control" placeholder={employee.gross_salary} />
          </div>
          <div className="col-md-6">
            <label className="labels">Cost Sharing</label>
            <input ref={costSharingRef}  type="number" className="form-control"   placeholder={employee.cost_sharing} typ/>
          </div>
        </div>



        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Social</label>
            <input ref={socialRef} type="number" className="form-control" placeholder={employee.social} />
          </div>
          <div className="col-md-6">
            <label className="labels">Loan</label>
            <input ref={loanRef} type="number" className="form-control"   placeholder={employee.loan} typ/>
          </div>
        </div>

        <div className="row mt-6">
          <div className="col-md-12">
            <label className="labels">Penality</label>
            <input ref={penalityRef} type="number" className="form-control" placeholder={employee.penality} />
          </div>
          
        </div>
        <div className="row mt-6">
          <div className="col-md-12">
            <label className="labels">Bank Account</label>
            <input ref={bankAccountRef} type="number" className="form-control" placeholder={employee.bank_account} />
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