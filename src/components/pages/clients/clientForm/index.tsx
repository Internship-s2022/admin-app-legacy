import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from 'src/components/pages/clients/clientForm/clientsForm.module.css';
import validations from 'src/components/pages/clients/validations';
import { Button, DatePicker, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import { UiRoutes } from 'src/constants';
import { addClient } from 'src/redux/client/thunks';
import { AppDispatch } from 'src/types';

import { FormValues } from '../types';

const ClientForm = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      localContact: {
        name: '',
        email: '',
      },
      clientContact: {
        name: '',
        email: '',
      },
      relationshipStart: new Date(Date.now()),
      notes: '',
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(validations.createClientValidation),
  });

  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useDispatch();

  const onSubmit = (data) => {
    dispatch(addClient(data));
    onClose();
  };

  const onClose = () => {
    handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>Crear un cliente</div>
        <div className={styles.bellIcon}>
          <BellIcon />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.leftContainer}>
            <div className={styles.leftColumns}>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientNameInput'}
                  label="Cliente"
                  placeholder="Nombre del ciente"
                  name="name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientEmailInput'}
                  label="Email contacto cliente"
                  name="clientContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email de contacto de cliente"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'localEmailInput'}
                  label="Email contacto Radium Rocket"
                  name="localContact.email"
                  type={'text'}
                  variant="outlined"
                  placeholder="Email de contacto de Radium Rocket"
                  fullWidth
                />
              </div>
            </div>
            <div className={styles.leftColumns}>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'clientContactInput'}
                  label="Contacto cliente"
                  placeholder="Nombre del contacto del ciente"
                  name="clientContact.name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.inputs}>
                <TextInput
                  control={control}
                  testId={'localContactInput'}
                  label="Contacto Radium Rocket"
                  placeholder="Nombre del contacto del Radium Rocket"
                  name="localContact.name"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={styles.dateContainer}>
                <div className={styles.inputs}>
                  <DatePicker
                    label={'Inicio'}
                    testId={'startDatePickerTestId'}
                    name="relationshipStart"
                    control={control}
                  />
                </div>
                <div className={styles.inputs}>
                  <DatePicker
                    label={'Fin'}
                    testId={'endDatePickerTestId'}
                    name="relationshipEnd"
                    control={control}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <TextInput
              control={control}
              testId={'notesInput'}
              label="Notas"
              name="notes"
              type={'text'}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <div>
            <Button
              testId="cancelButton"
              materialVariant={Variant.OUTLINED}
              onClick={() => onClose()}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={handleSubmit(onSubmit)}
              label="Confirmar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
