import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./payroll.css";
import ReactPaginate from "react-paginate";
import CreatePayroll from "./CreatePayroll";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Modal, Table } from "react-bootstrap";
import PopUpWithYesNoField from "./PopUpWithYesNoField";

function Payroll() {


  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 5;
  const pagesVisited = pageNumber * employeesPerPage;
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleYes = () => {
    // handle yes button click
    setShow(false);
  };

  const handleNo = () => {
    // handle no button click
    setShow(false);
  };

  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/payrolls/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCalculation = (id) => {
    fetch(`http://127.0.0.1:8000/api/payroll/calculate/${id}/`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((employee) => {
        setEmployees((employees) =>
          employees.map((emp) => (emp.id === employee.id ? employee : emp))
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deletePayroll = (employee) => {
    fetch(`http://127.0.0.1:8000/api/payroll/${employee.id}/`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => window.location.reload(false))
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function downloadPayrollCSV() {
    fetch("http://127.0.0.1:8000/api/csv/")
      .then((response) => {
        // Create a blob object from the CSV data
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "allpayrolldata.csv");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the temporary link element
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  }

  const displayEmployees = employees
    .slice(pagesVisited, pagesVisited + employeesPerPage)
    .map((employee) => {
      console.log(employee)
      return (

        <>


      <Table
				dataSource={dataSource} columns={columns}
			
			/>


        
        <tr key={employee.id}>
          <td>
            <div className="form-outline">{employee.id}</div>
          </td>
          <td>
            <div className="form-outline">{employee.employee_name}</div>
          </td>
          <td>
            <div className="form-outline">{employee.age}</div>
          </td>
          <td>
            <div className="form-outline">{employee.working_days}</div>
          </td>
          <td>
            <div className="form-outline">{employee.basic_salary}</div>
          </td>
          <td>
            <div className="form-outline">{employee.overtime}</div>
          </td>

          <td>
            <div className="form-outline">{employee.bonus}</div>
          </td>

          <td>
            <div className="form-outline">{employee.house_allowance}</div>
          </td>
          <td>
            <div className="form-outline">{employee.prediem}</div>
          </td>

          <td>
            <div className="form-outline">{employee.transport_allowance}</div>
          </td>

          <td>
            <div className="form-outline">
              {employee.transport_allowance_prediem}
            </div>
          </td>

          <td>
            <div className="form-outline">{employee.telephone_allowance}</div>
          </td>

          <td>
            <div className="form-outline">{employee.gross_salary}</div>
          </td>

          <td>
            <div className="form-outline">{employee.taxable_income}</div>
          </td>

          <td>
            <div className="form-outline">{employee.tax_by_percent}</div>
          </td>

          <td>
            <div className="form-outline">{employee.tax_by_number}</div>
          </td>

          <td>
            <div className="form-outline">{employee.pensions}</div>
          </td>

          <td>
            <div className="form-outline">{employee.cost_sharing}</div>
          </td>

          <td>
            <div className="form-outline">{employee.social}</div>
          </td>

          <td>
            <div className="form-outline">{employee.loan}</div>
          </td>

          <td>
            <div className="form-outline">{employee.penality}</div>
          </td>

          <td>
            <div className="form-outline">{employee.total_deduction}</div>
          </td>

          <td>
            <div className="form-outline">{employee.net_pay}</div>
          </td>

          <td>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure You want to remove user?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleNo}>
                  No
                </Button>
                <Button variant="primary" onClick={handleYes}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-sm">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={`/edit/${employee.id}`}>
                    <button className="btn btn-warning btn-sm">Edit</button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={`/bank/${employee.id}`}>
                    <button className="btn btn-primary btn-sm">Bank</button>
                  </Link>
                </Dropdown.Item>
          
                <PopUpWithYesNoField
                  employee={employee}
                  handleDelete={deletePayroll}
                />
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>

        </>
      );
    });

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  

  return (
    <>

    <div className="container card p-2 ">
      
    <div class="card-header">
  
    <Link to={"/banks/"} className="btn btn-success  btn-sm">
        Amount Transfer
      </Link>
        <button type="button" class="btn btn-primary btn-sm float-end" onClick={downloadPayrollCSV}>  Download to excel</button>
    </div>

    <div className="card-body table-responsive">
  

      <table
        className="table table-lg table-striped font"
    
        
      >
        <thead className="table-dark ">
          <tr>
            <th scope="col">
            Id
            </th>
            <th scope="col">
           Full Name
            </th>
            <th scope="col">
           Age
            
              </th>
            <th scope="col">
           W.Days
            
            </th>
            <th scope="col">
            B.Salary
             </th>
            <th scope="col">
            OT
              </th>
            <th scope="col">
            Bonus
              </th>
            <th scope="col">
            H.Allowance
              </th>
            <th scope="col">
            Prediems
              </th>
            <th scope="col">
           T.Allowance
             </th>
            <th scope="col">
            መዘዋወሪያ
            </th>
            <th scope="col">
            Tel.Allowance
            </th>
            <th scope="col">
             G.Salars
             </th>
            <th scope="col">
           T.Income
            </th>
            <th scope="col">
            T.Percent
             </th>
            <th scope="col">
            T.Value
             </th>
            <th scope="col">
             Pensions
             </th>
            <th scope="col">
           C.Sharing
            </th>
            <th scope="col">
           Social
              </th>
            <th scope="col">
           Loan
              </th>
            <th scope="col">
           Penalites
              </th>
            <th scope="col">
           T.Deduction
              </th>
            <th scope="col">
            Net Pays
             </th>
            <th scope="col">
            Actions
              </th>
          </tr>
        </thead>
        <tbody>{displayEmployees}</tbody>
        <tfoot>
        
        </tfoot>
      </table>
     


   
      </div>
      <div>

      
      <div className="card-footer d-flex justify-content-between">

  
            <div className=" justify-content-start">

            <CreatePayroll />
            </div>
        
      <div className=" justify-content-end"
      >

      <ReactPaginate
       breakLabel={'...'}
       breakClassName={'item break-me '}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disabled"}
        activeClassName={'item active'}
        previousClassName={"prev"}
        pageRangeDisplayed={2}
      
      />
      </div>
      </div>
</div>
       </div>
    </>
  );
}

export default Payroll;
