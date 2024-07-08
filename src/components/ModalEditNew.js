// ModalAddNew.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { putUpdateUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalEditNew = (props) => {
  const { show, handleClose, handleEditUserFromModal, dataUserEdit } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(dataUserEdit && dataUserEdit.id, name, job);

    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit && dataUserEdit.id,
      });
      handleClose();
      toast.success("Updated success!");
    } else {
      toast.error("Failed to update user");
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
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditNew;
