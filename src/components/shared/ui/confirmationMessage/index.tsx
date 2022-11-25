import React from 'react';

import Button from '../buttons/button';
import { Variant } from '../buttons/button/types';
import styles from './confirmationMessage.module.css';
import { ConfirmationMessageProps } from './types';

const ConfirmationMessage = (props: ConfirmationMessageProps) => {
  const { title, handleConfirm, handleClose, description } = props;
  return (
    <div className={styles.container}>
      <span>{title}</span>
      <div>
        <p>{description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.cancelBtn}>
          <Button
            testId="cancelBtn"
            materialVariant={Variant.OUTLINED}
            label="Cancelar"
            onClick={handleClose}
          />
        </div>
        <div>
          <Button
            testId="confirmBtn"
            materialVariant={Variant.CONTAINED}
            label="Confirmar"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
