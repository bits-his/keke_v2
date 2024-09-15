import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const UserDetailsModal = ({ isOpen, toggle, userData }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>User Details</ModalHeader>
      <ModalBody>
        {userData && (
          <>
            <p>Name: {userData.name}</p>
            <p>Phone: {userData.phone}</p>
            <p>Email: {userData.email}</p>
            <p>Contact Address: {userData.address}</p>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
        <Button color="danger" onClick={toggle}>Delete</Button>

      </ModalFooter>
    </Modal>
  );
};

export default UserDetailsModal;
