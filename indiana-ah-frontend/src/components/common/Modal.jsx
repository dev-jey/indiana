import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

const CustomModal = props => (
  <div>
    <Modal
      show={props.modalIsOpen}
      onHide={props.closeModal}
      dialogClassName={`Modal ${props.customClass}`}>

      <Modal.Body>{props.body}</Modal.Body>
    </Modal>
  </div>
);

CustomModal.propTypes = {
  body: PropTypes.any,
  customClass: PropTypes.any,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};
export default CustomModal;
