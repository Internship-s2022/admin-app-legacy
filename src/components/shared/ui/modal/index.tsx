import React from 'react';
import { Dialog as MaterialModal } from '@mui/material';

import { ModalProps } from './types';

const Modal = (props: ModalProps): JSX.Element => {
  const { onClose, children, testId, isOpen } = props;
  const handleClose = (_, reason) => {
    reason === 'backdropClick' && onClose(!isOpen);
  };
  return (
    <MaterialModal onClose={handleClose} open={isOpen} id={testId}>
      <div>{children}</div>
    </MaterialModal>
  );
};

export default Modal;

//onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)
