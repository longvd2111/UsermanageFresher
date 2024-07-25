// ModalConfirm.js
import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { deleteUser } from "../services/userService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;

  const handleConfirm = async () => {
    const res = await deleteUser(dataUserDelete && dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      handleClose();
      toast.success("Delete success!");
      handleDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Failed to delete user!");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undo! Do you want to delete this user?
            <br></br>
            <b>email = {dataUserDelete.email}?</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
