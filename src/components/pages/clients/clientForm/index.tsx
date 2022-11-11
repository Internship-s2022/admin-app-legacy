import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from 'src/components/pages/clients/clientForm/clientsForm.module.css';
import validations from 'src/components/pages/clients/validations';
import { Button, DatePicker, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import { UiRoutes } from 'src/constants';

import { FormValues } from '../types';

const ClientForm = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      localContact: '',
      localEmail: '',
      clientContact: '',
      clientEmail: '',
      relationshipEnd: '2000-07-03T00:00:00.000Z' as unknown as Date,
      relationshipStart: new Date(Date.now()),
      notes: '',
    },
    mode: 'onBlur',
    resolver: joiResolver(validations.createClientValidation),
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('holi');
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
        <form>
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
                  name="clientEmail"
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
                  name="localEmail"
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
                  name="clientContact"
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
                  name="localContact"
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
              onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`)}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={() => handleSubmit()}
              label="Confirmar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
