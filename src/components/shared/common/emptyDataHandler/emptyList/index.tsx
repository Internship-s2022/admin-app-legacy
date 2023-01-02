import React from 'react';

import UserForm from 'src/components/pages/users/userForm';
import { Button, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { closeFormModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';
import { cutLastLetter } from 'src/utils/formatters';

import { EmptyDataProps } from '../types';
import styles from './emptyList.module.css';

const EmptyList = (props: EmptyDataProps) => {
  const { resource, isEmployee, handleAdd } = props;

  const isNotification = resource === 'notificaciones';
  const dispatch: AppDispatch<null> = useAppDispatch();
  const showFormModal = useAppSelector((state: RootState) => state.ui.showFormModal);

  return isNotification ? (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span>No hay {resource} pendientes</span>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.emptyNotifications}
          src={`${process.env.PUBLIC_URL}/assets/images/emptyNotifications.png`}
          alt={'empty-notifications'}
        ></img>
      </div>
    </div>
  ) : (
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
      <div className={styles.modalContainer}>
        <Modal
          onClose={() => dispatch(closeFormModal())}
          isOpen={showFormModal}
          testId="add-user-modal"
        >
          <UserForm />
        </Modal>
      </div>
    </div>
  );
};

export default EmptyList;
