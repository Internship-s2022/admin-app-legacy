import React from 'react';

import { Button } from 'src/components/shared/ui';
import { ErrorType } from 'src/redux/types';

import { Variant } from '../../ui/buttons/button/types';
import styles from './emptyDataHandler.module.css';
import EmptyList from './emptyList';
import { EmptyDataProps } from './types';

const EmptyDataHandler = (props: EmptyDataProps) => {
  const { error, handleReload, resource, isEmployee, handleAdd } = props;
  return error?.errorType === ErrorType.NETWORK_ERROR ? (
    <div className={styles.errorContainer}>
      <div className={styles.textContainer}>
        <span>Lista de {resource}</span>
        <div className={styles.errorMessage}>
          <p>No se ha podido cargar la lista de {resource}</p>
          <p>Error: {error.message}</p>
        </div>
        <Button
          materialVariant={Variant.CONTAINED}
          testId="reload-button"
          onClick={handleReload}
          label="Recargar"
        />
      </div>
      <div className={styles.errorImg}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/serverError.png`}
          alt="server error"
        ></img>
      </div>
    </div>
  ) : (
    <EmptyList isEmployee={isEmployee} handleAdd={handleAdd} resource={resource.toLowerCase()} />
  );
};

export default EmptyDataHandler;
