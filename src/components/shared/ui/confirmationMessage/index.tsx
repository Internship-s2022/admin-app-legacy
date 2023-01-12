import React from 'react';

import { Variant } from '../buttons/button/types';
import LogoutIcon from '../icons/logoutIcon';
import WarningIcon from '../icons/warning';
import { Button } from '../index';
import styles from './confirmationMessage.module.css';
import { ConfirmationMessageProps } from './types';

const ConfirmationMessage = (props: ConfirmationMessageProps) => {
  const {
    title,
    handleConfirm,
    handleClose,
    description,
    testIdDescription,
    testIdTitle,
    color,
    userModal,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div data-testid={testIdTitle} className={styles.title}>
          {title}
        </div>
        {color && (
          <div className={styles.logoutIcon}>
            <LogoutIcon color={color} />
          </div>
        )}
      </div>
      <div className={styles.description}>
        <p data-testid={testIdDescription}>{description}</p>
      </div>
      <div className={styles.warningConfirmation}>
        {userModal?.length && (
          <>
            <WarningIcon />
            <div>
              <div className={styles.warningMessage}>
                El usuario que está intentando desactivar está vinculado a uno o más proyetos
              </div>
            </div>
          </>
        )}
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
            testId="confirm-button"
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
