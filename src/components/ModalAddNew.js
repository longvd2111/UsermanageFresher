import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const ModalAddNew = (props) => {
  const { show, handleClose } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSave = () => {
    console.log(name);
    console.log(job);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2" for="name">
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

              <Form.Group as={Row} className="mb-3" controlId="job">
                <Form.Label column sm="2" for="job">
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
