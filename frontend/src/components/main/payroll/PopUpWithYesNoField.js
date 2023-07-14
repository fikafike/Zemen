import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function PopUpWithYesNoField({ employee, handleDelete }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleYes = () => {
    // handle yes button click
    handleDelete(employee);
    setShow(false);
  };

  

  const handleNo = () => {
    // handle no button click
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" className="btn-sm" onClick={handleShow} style={{marginLeft:15}}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove Mister {employee.employee_name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
          <Button variant="danger" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpWithYesNoField;