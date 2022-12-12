import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { useAppDispatch } from 'src/redux/store';
import { closeFormModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import { Button, DatePicker, TextInput } from '../../ui';
import { Variant } from '../../ui/buttons/button/types';
import styles from './customNotifications.module.css';
import { FormValues } from './types';
import customNotificationsValidations from './validations';

const CustomNotifications = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();

  const { control } = useForm<FormValues>({
    defaultValues: {
      customMessage: '',
      date: null,
    },
    mode: 'onBlur',
    resolver: joiResolver(customNotificationsValidations),
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>Agregar recordatorio</div>
      <form>
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
                testId="confirmButton"
                materialVariant={Variant.CONTAINED}
                onClick={() => console.log()}
                label="Confirmar"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomNotifications;
