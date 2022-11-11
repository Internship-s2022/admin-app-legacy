import React from 'react';

import { cutLastLetter } from 'src/utils/formatters';

import Button from '../buttons/button';
import { Variant } from '../buttons/button/types';
import styles from './deleteConfirmation.module.css';
import { deleteConfirmationProps } from './types';

const DeleteConfirmation = (props: deleteConfirmationProps) => {
  const { resource, id, name, handleDelete, onClose } = props;
  return (
    <div className={styles.container}>
      <span>Eliminar {cutLastLetter(resource)}</span>
      <div>
        <p>{`¿Desea eliminar al ${cutLastLetter(resource).toLowerCase()} ${name}?`}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.cancelBtn}>
          <Button
            testId="cancelBtn"
            materialVariant={Variant.OUTLINED}
            label="Cancelar"
            onClick={onClose}
          />
        </div>
        <div>
          <Button
            testId="confirmBtn"
            materialVariant={Variant.CONTAINED}
            label="Confirmar"
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
