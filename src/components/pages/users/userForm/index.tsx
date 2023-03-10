import { format, subYears } from 'date-fns';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { getByFilterResourceRequest } from 'src/config/api';
import { AccessRoleType, ApiRoutes } from 'src/constants';
import { useAppDispatch } from 'src/redux/store';
import { closeFormModal } from 'src/redux/ui/actions';
import { addUser } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { accessRoles } from '../constants';
import { FormValues } from '../types';
import { userValidation } from '../validations';
import styles from './userForm.module.css';

const UserForm = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const [userEmailValidation, setUserEmailValidation] = useState(false);

  const emailValidationTrigger = async () => {
    await trigger('email');
  };

  useEffect(() => {
    if (getValues('email')) {
      emailValidationTrigger();
    }
  }, [userEmailValidation]);

  const emailChangeHandler = useCallback(
    debounce(async (e) => {
      try {
        const response = await getByFilterResourceRequest(`${ApiRoutes.USER}/userExists`, {
          email: e.target.value,
        });
        if (!response.error) {
          setUserEmailValidation(false);
        }
      } catch (error) {
        setUserEmailValidation(true);
      }
    }, 1000),
    [],
  );

  const { handleSubmit, control, reset, trigger, getValues } = useForm<FormValues>({
    defaultValues: {
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      birthDate: subYears(new Date(), 18),
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(userValidation(userEmailValidation)),
  });

  const onClose = () => {
    reset();
    dispatch(closeFormModal());
  };

  const onSubmit = (data) => {
    data = {
      ...data,
      birthDate: format(new Date(data?.birthDate), 'yyy/MM/dd'),
      email: getValues('email'),
    };
    dispatch(addUser(data));
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.addUserMessage}>Agregar usuario</div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputsColumns}>
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
              maxDate={subYears(new Date(), 18)}
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
          <div className={styles.inputsColumns}>
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
              handleOnChange={emailChangeHandler}
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
