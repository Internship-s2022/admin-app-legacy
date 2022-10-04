import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Typography } from '@mui/material';

import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';
import { User } from 'src/redux/user/types';
import { AppDispatch } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { Headers } from '../../shared/ui/table/types';
import { FormValues } from './types';
import styles from './users.module.css';
import { storybookValidation } from './validations';

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const dispatch: AppDispatch<null> = useDispatch();
  const listUser = useSelector((state: RootState) => state.user?.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      firebaseUid: '',
      accessRole: AccessRoleType.EMPLOYEE,
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      birthDate: undefined,
    },
    mode: 'onChange',
    resolver: joiResolver(storybookValidation),
  });

  const listUserData = listUser.map((item) => {
    return {
      id: item?._id,
      name: `${capitalizeFirstLetter(item?.firstName)} ${capitalizeFirstLetter(item?.lastName)}`,
      accessRoleType: item?.accessRoleType && formattedRoleType[item.accessRoleType],
    };
  });

  const onSubmit = (data) => {
    console.log('Data: ', data);
  };
  const onClose = () => {
    reset();
    setFormOpen(false);
  };

  const header: Headers[] = [
    { header: 'Nombre', key: 'name' },
    { header: 'Rol de acceso', key: 'accessRoleType' },
  ];

  const accessRoles = [
    { value: 'MANAGER', label: 'Manager' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
  ];

  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">¡Bienvenido S.Admin!</Typography>
        <p>¡Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table<User>
          showButtons={true}
          buttonVariant={Variant.CONTAINED}
          buttonLabel={'Editar Acceso'}
          buttonTestId={'table-button'}
          testId={'userTable'}
          headers={header}
          value={listUserData}
          onClick={() => setOpen(true)}
        />
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.TEXT}
            onClick={() => setFormOpen(true)} //TODO modal para agregar usuario
            label={'+ Agregar un nuevo usuario'}
            testId={'addUserButton'}
          />
        </div>
      </div>
      <div className={styles.modalContainer}>
        <Modal onClose={setFormOpen} isOpen={formOpen} testId="add-user-modal">
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputsContainer}>
                <TextInput
                  control={control}
                  testId={'firebase-input'}
                  label="Firebase Uid"
                  name="firebaseUid"
                  type={'text'}
                  variant="standard"
                  error
                  fullWidth
                />
                <Dropdown
                  control={control}
                  testId={'access-role-dropdown'}
                  label="Rol de acceso"
                  name="accessRole"
                  options={accessRoles}
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
                <TextInput
                  control={control}
                  testId={'first-name-input'}
                  label="Nombre"
                  name="firstName"
                  type={'text'}
                  error
                  fullWidth
                />
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
                  testId={'location-input'}
                  label="Localidad"
                  name="location"
                  type={'text'}
                  error
                  fullWidth
                />
                <TextInput
                  control={control}
                  testId={'date-input'}
                  name="birthDate"
                  type="date"
                  error
                  fullWidth
                />
              </div>
              <div className={styles.buttonsContainer}>
                <Button
                  testId="submit-btn"
                  materialVariant={Variant.CONTAINED}
                  label="Confirmar"
                  onClick={handleSubmit(onSubmit)}
                ></Button>
                <Button
                  testId="reset-btn"
                  materialVariant={Variant.OUTLINED}
                  label="Cancelar"
                  onClick={() => onClose()}
                ></Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Modal testId={'User-access-modal'} isOpen={open} onClose={() => setOpen(!open)}>
        <div className={styles.modalMessage}>
          <p>Este es el Modal para cambiar el rol de acceso de cada usuario.</p>
        </div>
      </Modal>
    </>
  );
};

export default Users;
