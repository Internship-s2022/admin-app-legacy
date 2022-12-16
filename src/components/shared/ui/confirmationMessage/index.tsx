import React from 'react';

import { Variant } from '../buttons/button/types';
import { Button } from '../index';
import styles from './confirmationMessage.module.css';
import { ConfirmationMessageProps } from './types';

const ConfirmationMessage = (props: ConfirmationMessageProps) => {
  const { title, handleConfirm, handleClose, description, testIdDescription, testIdTitle } = props;
  return (
    <div className={styles.container}>
      <span data-testid={testIdTitle}>{title}</span>
      <div>
        <p data-testid={testIdDescription}>{description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.cancelBtn}>
          <Button
            testId="cancel-button"
            materialVariant={Variant.OUTLINED}
            label="Cancelar"
            onClick={handleClose}
          />
        </div>
        <div>
          <Button
            testId="confirm-buttonconfirmBtn"
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
