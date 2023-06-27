import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./payroll.css";
import ReactPaginate from "react-paginate";
import CreatePayroll from "./CreatePayroll";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Modal } from "react-bootstrap";
import PopUpWithYesNoField from "./PopUpWithYesNoField";

function Payroll() {
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
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={`/edit/${employee.id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={`/bank/${employee.id}`}>
                    <button className="btn btn-primary">Bank</button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      handleCalculation(employee.id);
                    }}
                  >
                    Calculate
                  </button>
                </Dropdown.Item>

                <PopUpWithYesNoField
                  employee={employee}
                  handleDelete={deletePayroll}
                />
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Link to={"/banks/"} className="btn btn-dark">
        Amount Transfer
      </Link>
      <br />

      <div className="btn btn-primary" onClick={downloadPayrollCSV}>
        Download to excel
      </div>
      <div></div>

      <table
        className="table table-bordered hello"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>W.DAYS</th>
            <th>B.SALARY</th>
            <th>OT</th>
            <th>BONUS</th>
            <th>HOUSE ALLOW.</th>
            <th>PREDIEM.</th>
            <th>TRANSPORT ALLOWANCE</th>
            <th>TRANSPORT ALLOWANCE መዘዋወሪያ</th>
            <th>TELEPHONE ALLOWANCE</th>
            <th>GROSS SALARY</th>
            <th>TAXABLE INCOME</th>
            <th>TAX BY PERCENT</th>
            <th>TAXED VALUE</th>
            <th>PENSIONS</th>
            <th>COST SHARING</th>
            <th>SOCIAL</th>
            <th>LOAN</th>
            <th>PENALITY</th>
            <th>TOTAL DEDUCTION</th>
            <th>NET PAY</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <div></div>
        <tbody>{displayEmployees}</tbody>
        <tfoot>
          <tr>
            <CreatePayroll />
          </tr>
        </tfoot>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Payroll;
