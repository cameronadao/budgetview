import React from 'react';
import './ModalFooter.css';

const ModalFooter = ({ children }) => {
  return (
    <div className="modal-footer-fixed">
      {children}
    </div>
  );
};

export default ModalFooter;