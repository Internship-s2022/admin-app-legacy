import React from 'react';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { cutLastLetter } from 'src/utils/formatters';

import { EmptyDataProps } from '../types';
import styles from './emptyList.module.css';

const EmptyList = (props: EmptyDataProps) => {
  const { resource, isEmployee, handleAdd } = props;
  const isNotification = resource === 'notificaciones';
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        {!isNotification && <span>Aún no hay {resource}</span>}
        {isNotification && <span>No hay {resource} pendientes</span>}
        {isNotification && (
          <img
            className={styles.emptyNotifications}
            src={`${process.env.PUBLIC_URL}/assets/images/emptyNotifications.png`}
            alt={'empty-notifications'}
          ></img>
        )}
        {!isNotification && (
          <p>
            {isEmployee
              ? 'Para agregar uno contactate con el Super Admin'
              : 'Para agregar uno clickea en el siguiente botón'}
          </p>
        )}
      </div>
      {!isEmployee && !isNotification && (
        <div className={styles.buttonContainer}>
          <Button
            materialVariant={Variant.CONTAINED}
            testId="reloadButton"
            onClick={handleAdd}
            styles={'addButton'}
            label={`+ Agregar ${cutLastLetter(resource)}`}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyList;
