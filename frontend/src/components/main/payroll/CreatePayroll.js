import React from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Swal from 'sweetalert2';
function CreatePayroll() {
  const [isShow, setIsShow] = React.useState(false)
  const employeeNameRefereneces=React.useRef()
  const employeeSalary=React.useRef()
  const overtime=React.useRef()
  const workingDays=React.useRef()
  const bonus =React.useRef()
  const houseAllowance=React.useRef()
  const predTime=React.useRef()
  const transportAllowance=React.useRef()
  const telephoneAllowance=React.useRef()
  const grossSalary=React.useRef()
  const social=React.useRef()
  const loan=React.useRef()
  const bank_account=React.useRef()
  const costSharing=React.useRef()
  const penality=React.useRef()

  const initModal = () => {
    return setIsShow(!false)
  }
  const closeModal=()=>{
    setIsShow(!isShow)
  }

 
  const submitData=(e)=>{
    e.preventDefault();

    const inputs = [
    employeeNameRefereneces.current,
    employeeSalary.current,
    workingDays.current,
    overtime.current,
    bonus.current,
    houseAllowance.current,
    predTime.current,
    transportAllowance.current,
    telephoneAllowance.current,
    grossSalary.current,
    costSharing.current,
    social.current,
    loan.current,
    penality.current,
    bank_account.current,
  ];

  for (let input of inputs) {
    if (!input.value) {
      Swal.fire({
        title: 'Fields should not be none',
        text: 'Add every field in the data, Add 0 For unknown or default values',
        icon: 'danger',
        confirmButtonText: 'OK',
        background: '#fff',
        customClass: {
          title: 'my-title',
          content: 'my-content',
        },
        iconColor: '#36BBDA',
        textColor: '#36BBDA'
      });
      return false;
    }
  }
    // alert(e.)
    const new_employee={
      "employee_name": employeeNameRefereneces.current.value,
      "basic_salary": employeeSalary.current.value,
      "working_days": workingDays.current.value,
      "overtime": overtime.current.value,
      "bonus": bonus.current.value,
      "house_allow": houseAllowance.current.value,
      "predtime": predTime.current.value,
      "transport_allowance": transportAllowance.current.value,
      "telephone_allowance": telephoneAllowance.current.value,
      "gross_salary": grossSalary.current.value,
      "taxable_income": 0,
      "tax": 0,
      "pensions": 0,
      "cost_sharing": costSharing.current.value,
      "social": social.current.value,
      "loan": loan.current.value,
      "penality": penality.current.value,
      "bank_account": bank_account.current.value,
      "total_deduction": 0,
      "net_pay": 0
      

      
    }
    fetch(`http://127.0.0.1:8000/api/payroll/`, {
       method: 'POST',
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

    console.log(new_employee)
    window.location.reload(false);

  }
  return (
    <>
      <Button style={{paddingLeft:7}} variant="primary" onClick={initModal}>
        Add User
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Add new user here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitData}>
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Employee name</label>
              <input ref={employeeNameRefereneces} type='text'   className="form-control" id="employeeName" aria-describedby="employeeName" placeholder="Enter employee name"/>
            </div>

            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Salary</label>
              <input ref={employeeSalary}   className="form-control" id="employee" aria-describedby="employeeSalary"  type="number" placeholder="Enter employee salary"/>
            </div>

            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Working Days</label>
              <input ref={workingDays}    className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter working days "/>
            </div>

            
            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Overtime</label>
              <input ref={overtime}    className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter overtime "/>
            </div>

            
           
            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Bonus</label>
              <input ref={bonus}    className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter bonus "/>
            </div>

      
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">House  Allowance</label>
              <input ref={houseAllowance}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter house allownace "/>
            </div>

      
      
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Pred time</label>
              <input ref={predTime}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter pred time"/>
            </div>

      
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Transport Allowance</label>
              <input ref={transportAllowance}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter transport Allowance "/>
            </div>
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Telephone Allowance</label>
              <input ref={telephoneAllowance}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter telephone Allowance "/>
            </div>

            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Gross Salary</label>
              <input ref={grossSalary}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter gross salary"/>
            </div>
            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Social</label>
              <input ref={social}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter social"/>
            </div>

            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Loan</label>
              <input ref={loan}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter loan"/>
            </div>
            
            
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Bank Account</label>
              <input ref={bank_account}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter bank account"/>
            </div>
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Cost Sharing</label>
              <input ref={costSharing}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter cost sharing"/>
            </div>
            <div className="form-group">
              <label  htmlFor="exampleInputEmail1">Penality</label>
              <input ref={penality}   className="form-control" id="overtime" aria-describedby="overtime"  type="number" placeholder="Enter penality"/>
            </div>

            
            <button type="submit" className="btn btn-dark">Store</button>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CreatePayroll