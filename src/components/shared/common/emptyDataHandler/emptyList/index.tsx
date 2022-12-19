import React from 'react';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { cutLastLetter } from 'src/utils/formatters';

import { EmptyDataProps } from '../types';
import styles from './emptyList.module.css';

const EmptyList = (props: EmptyDataProps) => {
  const { resource, isEmployee, handleAdd } = props;
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span>Aún no hay {resource}</span>
        <p>
          {isEmployee
            ? 'Para agregar uno contactate con el Super Admin'
            : 'Para agregar uno clickea en el siguiente botón'}
        </p>
      </div>
      {!isEmployee && (
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
