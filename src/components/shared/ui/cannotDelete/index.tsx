import React from 'react';

import Button from '../buttons/button';
import { Variant } from '../buttons/button/types';
import styles from './cannotDelete.module.css';
import { CannotDeleteProps } from './types';

const CannotDelete = (props: CannotDeleteProps) => {
  const { handleClose, testId } = props;
  return (
    <div className={styles.container} data-testid={testId}>
      <div className={styles.titleContainer}>
        <div data-testid="title-container" className={styles.title}>
          Acción inválida
        </div>
      </div>
      <div className={styles.description}>
        <p>No es posible desactivar el proyecto debido a que posee miembros asociados.</p>
        <p>Por favor, deshabilite los miembros e intente nuevamente.</p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          testId="agree-button"
          materialVariant={Variant.CONTAINED}
          label="Aceptar"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default CannotDelete;
