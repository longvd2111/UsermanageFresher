// ModalAddNew.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { postCreateUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalEditNew = (props) => {
  const { show, handleClose, handleUpdateTable, dataUserEdit } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("A new user is created success");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("Failed to create user");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="name">
                  Name:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Enter your name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor="job">
                  Job:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    placeholder="Enter your job"
                    id="job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditNew;
