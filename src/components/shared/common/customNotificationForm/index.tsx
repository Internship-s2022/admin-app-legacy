import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { createNotification } from 'src/redux/notifications/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeFormModal,
  openConfirmationModal,
} from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import { Button, ConfirmationMessage, DatePicker, Modal, TextInput } from '../../ui';
import { Variant } from '../../ui/buttons/button/types';
import styles from './customNotifications.module.css';
import { customNotificationProps, FormValues } from './types';
import customNotificationsValidations from './validations';

const CustomNotifications = (props: customNotificationProps) => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);

  const { resource } = props;

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      customMessage: '',
      date: null,
    },
    mode: 'onBlur',
    resolver: joiResolver(customNotificationsValidations),
  });

  const onSubmit = (data) => {
    const body = {
      ...data,
      notificationType: resource,
      isCustom: true,
    };
    dispatch(createNotification(body));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>Agregar recordatorio</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <div>
            <TextInput
              control={control}
              testId={'custom-message-button'}
              name="customMessage"
              type={'text'}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
            />
          </div>
          <div className={styles.input}>
            <DatePicker
              label={'Fecha'}
              testId={'date-picker-custom'}
              name="date"
              control={control}
            />
          </div>
          <div className={styles.buttonContainer}>
            <div>
              <Button
                testId="cancel-button"
                materialVariant={Variant.OUTLINED}
                onClick={() => dispatch(closeFormModal())}
                label="Cancelar"
              />
            </div>
            <div>
              <Button
                testId="confirm-button"
                materialVariant={Variant.CONTAINED}
                onClick={() => dispatch(openConfirmationModal())}
                label="Confirmar"
              />
            </div>
          </div>
        </div>
      </form>
      <Modal
        testId="custom-notification-employee"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={'¿Desea agregar una notificación?'}
          title={'Notificacion personalizada'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default CustomNotifications;
