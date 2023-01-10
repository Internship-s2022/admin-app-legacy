import React from 'react';

import { cutLastLetter } from 'src/utils/formatters';

import Button from '../buttons/button';
import { Variant } from '../buttons/button/types';
import styles from './cannotDelete.module.css';
import { CannotDeleteProps } from './types';

const CannotDelete = (props: CannotDeleteProps) => {
  const { entity, secondEntity, handleClose, testId } = props;
  return (
    <div className={styles.container} data-testid={testId}>
      <div className={styles.titleContainer}>
        <div data-testid="title-container" className={styles.title}>
          No se puede desactivar
        </div>
      </div>
      <div className={styles.description}>
        <p>
          Este {cutLastLetter(entity)} tiene {secondEntity} asociados. Por favor revisar antes de
          desactivar
        </p>
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
