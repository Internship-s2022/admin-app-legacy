import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Typography } from '@mui/material';

import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { addUser, deleteUser, getUsers } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { Headers, TableButton } from '../../shared/ui/table/types';
import AccessRoleModal from './AccessRoleModal';
import { FormValues, UserData } from './types';
import styles from './users.module.css';
import { userValidation } from './validations';

export const accessRoles = [
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'EMPLOYEE', label: 'Employee' },
];

const Users = () => {
  const [row, setRow] = React.useState({} as UserData);
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);
  const dispatch: AppDispatch<null> = useDispatch();
  const listUser = useSelector((state: RootState) => state.user?.users);
  const isPending = useSelector((state: RootState) => state.user.isPending);

  const filteredUser = listUser.filter((item) => item.isActive === true);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      firebaseUid: '1a12sdas3',
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      birthDate: undefined,
      isActive: true,
    },
    mode: 'onChange',
    resolver: joiResolver(userValidation),
  });

  const listUserData = filteredUser.map((item): UserData => {
    return {
      id: item?._id,
      name: `${capitalizeFirstLetter(item?.firstName)} ${capitalizeFirstLetter(item?.lastName)}`,
      accessRoleType: item?.accessRoleType && formattedRoleType[item.accessRoleType],
    };
  });

  const header: Headers[] = [
    { header: 'Nombre', key: 'name' },
    { header: 'Rol de acceso', key: 'accessRoleType' },
  ];

  const onSubmit = (data) => {
    dispatch(addUser(data));
    onClose();
  };

  const onClose = () => {
    reset();
    setFormOpen(false);
  };

  const handleDelete = (data) => {
    dispatch(deleteUser(data.id));
  };

  const buttonsArray: TableButton<UserData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        setOpen(true);
        setRow(data);
      },
    },
    {
      active: true,
      label: 'X',
      testId: 'deleteButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        handleDelete(data);
      },
    },
  ];
  return !listUser.length ? (
    <div className={styles.addUserButton}>
      <Button
        materialVariant={Variant.TEXT}
        onClick={() => setFormOpen(true)}
        label={'+ Agregar un nuevo usuario'}
        testId={'addUserButton'}
      />
    </div>
  ) : (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">¡Bienvenido S.Admin!</Typography>
        <p>¡Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table<UserData>
          showButtons={true}
          testId={'userTable'}
          headers={header}
          value={listUserData}
          buttons={buttonsArray}
        />
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.TEXT}
            onClick={() => setFormOpen(true)}
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
                <Dropdown
                  control={control}
                  testId={'access-role-dropdown'}
                  label="Rol de acceso"
                  name="accessRoleType"
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
                />
                <Button
                  testId="reset-btn"
                  materialVariant={Variant.OUTLINED}
                  label="Cancelar"
                  onClick={() => onClose()}
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Modal testId={'User-access-modal'} isOpen={open} onClose={() => setOpen(!open)}>
        <AccessRoleModal row={row} open={open} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default Users;
