import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    // Empêcher le défilement du body lorsque le modal est ouvert
    document.body.style.overflow = 'hidden';
    // Ajouter une classe au body pour le style
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;