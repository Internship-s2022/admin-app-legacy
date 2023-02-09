import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';

import { Variant } from '../buttons/button/types';
import LogoutIcon from '../icons/logoutIcon';
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

  const [open, setOpen] = React.useState(true);

  return (
    <>
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
      <div className={styles.warningContainer}>
        {userModal?.length && (
          <>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>¡Cuidado!</AlertTitle>
                El empleado que está intentando desactivar está asignado a uno o más proyectos
              </Alert>
            </Collapse>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmationMessage;
