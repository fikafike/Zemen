import React, { useState,useEffect   } from 'react';
import ReactPaginate from 'react-paginate';


function GetPayroll(){
    
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 5;
  const pagesVisited = pageNumber * employeesPerPage;
  const [employees, setEmployees] = useState([])
  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/payrolls/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setEmployees(data)
      }).catch(e=>{
        console.log(e)
      })
  }
  
  const handleCalculation = (id) => {
    fetch(`http://127.0.0.1:8000/api/payroll/calculate/${id}/`, {
       method: 'POST',
       body: JSON.stringify({
         
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((res) => res.json())
       .then((employee) => {
        setEmployees((employees) => 
        employees.map((emp)=>emp.id===employee.id?employee:emp)
        );
             })
       .catch((err) => {
          console.log(err.message);
       });
 };

  useEffect(() => {
    fetchUserData()
  }, [])



  const displayEmployees = employees
    .slice(pagesVisited, pagesVisited + employeesPerPage)
    .map((employee) => {
      return (
        <tr key={employee.id}>
          <td>
         <div class="form-outline">
         {employee.employee_name} 
              </div>
        </td>
        <td>
                <div class="form-outline">
               {employee.basic_salary}
            </div>
        </td>


          <td>  
            <div class="form-outline">
               {employee.working_days}  
            </div>
        </td>
        <td>  
            <div class="form-outline">
               {employee.overtime}  
            </div>
        </td>

        <td>  
            <div class="form-outline">
               {employee.bonus}  
            </div>
        </td>

        <td>  
            <div class="form-outline">
               {employee.house_allow}  
            </div>
        </td>
        <td>  
            <div class="form-outline">
               {employee.transport_allowance}  
            </div>
        </td>


        <td>  
            <div class="form-outline">
               {employee.telephone_allowance}  
            </div>
        </td>


        <td>  
            <div class="form-outline">
               {employee.gross_salary}  
            </div>
        </td>




        <td>  
            <div class="form-outline">
               {employee.taxable_income}  
            </div>
        </td>




        <td>  
            <div class="form-outline">
              <p type="text" id="typeText" class="form-control"  style={{width: "200px"}} value={employee.tax} >{employee.tax}%</p>
            </div>
        </td>

        <td>  
            <div class="form-outline">
               {employee.pensions}  
            </div>
        </td>

        <td>  
            <div class="form-outline">
               {employee.cost_sharing}  
            </div>
        </td>


        <td>  
            <div class="form-outline">
               {employee.social}  
            </div>
        </td>




        <td>  
            <div class="form-outline">
               {employee.loan}  
            </div>
        </td>







        <td>  
            <div class="form-outline">
               {employee.penality}  
            </div>
        </td>





        <td>  
            <div class="form-outline">
              <p>{employee.total_deduction}</p>
            </div>
        </td>





        <td>  
            <div class="form-outline">
              <p>{employee.net_pay}</p>
            </div>
        </td>









         
          <td><button onClick={()=>{
            handleCalculation(employee.id)
          }}>Calculate</button></td>
        </tr>
      );
    });

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
    
      <table
        id="dtBasicExample"
        
        width="100%" border="0" cellspacing="0" cellpadding="0"
        
      >

        <thead>          
          <tr>
            <th className="th-sm">Full Name</th>
            <th className="th-sm">Salary</th>
            <th className="th-sm">Working Days</th>
            <th className="th-sm">Overtime</th>
            <th className="th-sm">Bonus</th>
            <th className="th-sm">House Allowance</th>
            <th className="th-sm">Transport Allowance</th>
            <th className="th-sm">Telephone Allowance</th>
            <th className="th-sm">Gross Salary</th>
            <th className="th-sm">Taxable Income</th>
            <th className="th-sm">Tax</th>
            <th className="th-sm">Pensions</th>
            <th className="th-sm">Cost Sharing</th>
            <th className="th-sm">Social</th>
            <th className="th-sm">Loan</th>
            <th className="th-sm">Penality</th>
            <th className="th-sm">Total deduction</th>
            <th className="th-sm">Net pay</th>
            <th className="th-sm">Calculate</th>
          </tr>
        </thead>
        <div>
          
        </div>
        <tbody>{displayEmployees}</tbody>
        <tfoot>
          <tr>
            <button  type="button" class="btn btn-danger">Add</button>
            <GetPayroll />
          </tr>
        </tfoot>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    </>
  );


}

export default GetPayroll