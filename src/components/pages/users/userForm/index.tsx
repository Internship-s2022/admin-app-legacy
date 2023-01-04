import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { AccessRoleType } from 'src/constants';
import { useAppDispatch } from 'src/redux/store';
import { closeFormModal } from 'src/redux/ui/actions';
import { addUser } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { accessRoles } from '../constants';
import { FormValues } from '../types';
import styles from '../users.module.css';
import { userValidation } from '../validations';

const UserForm = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      birthDate: new Date(undefined),
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(userValidation),
  });

  const onClose = () => {
    reset();
    dispatch(closeFormModal());
  };

  const onSubmit = (data) => {
    data = {
      ...data,
      birthDate: format(new Date(data?.birthDate), 'yyy/MM/dd'),
    };
    dispatch(addUser(data));
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.addUserMessage}>Agregar usuario</div>
        <div className={styles.inputsContainer}>
          <div className={styles.leftInputsContainer}>
            <TextInput
              control={control}
              testId={'first-name-input'}
              label="Nombre"
              name="firstName"
              type={'text'}
              error
              fullWidth
            />
            <DatePicker
              label={'Fecha de nacimiento'}
              testId={'birthDate'}
              name="birthDate"
              control={control}
            />
            <TextInput
              control={control}
              testId={'location-input'}
              label="Localidad"
              name="location"
              type={'text'}
              error
              fullWidth
            />
          </div>
          <div className={styles.rightInputsContainer}>
            <TextInput
              control={control}
              testId={'last-name-input'}
              label="Apellido"
              name="lastName"
              type={'text'}
              error
              fullWidth
            />
            <TextInput
              control={control}
              testId={'email-input'}
              label="Email"
              name="email"
              type={'text'}
              variant="outlined"
              error
              fullWidth
            />
            <Dropdown
              control={control}
              testId={'access-role-dropdown'}
              label="Rol de acceso"
              name="accessRoleType"
              options={accessRoles}
              error
              fullWidth
            />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            testId="reset-btn"
            materialVariant={Variant.OUTLINED}
            label="Cancelar"
            onClick={() => onClose()}
          />
          <Button
            testId="submit-btn"
            materialVariant={Variant.CONTAINED}
            label="Confirmar"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
