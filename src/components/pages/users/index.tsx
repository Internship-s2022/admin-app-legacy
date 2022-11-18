import { format } from 'date-fns';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { closeFormModal, closeModal, openFormModal, openModal } from 'src/redux/ui/actions';
import { addUser, deleteUser, getUsers } from 'src/redux/user/thunks';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { TableButton } from '../../shared/ui/table/types';
import AccessRoleModal from './AccessRoleModal';
import { accessRoles, userFilterOptions, userHeaders } from './constants';
import { FormValues, SearchUserData, UserData } from './types';
import styles from './users.module.css';
import { userValidation } from './validations';

const Users = () => {
  const [row, setRow] = React.useState({} as UserData);
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const showFormModal = useSelector((state: RootState) => state.ui.showFormModal);
  const superAdmin = useSelector((state: RootState) => state.auth.authUser);
  const userList = useSelector((state: RootState) => state.user.list);

  const navigate = useNavigate();

  const dispatch: AppDispatch<null> = useDispatch();

  const activeUsers = useMemo(() => {
    return userList.reduce((acc, item) => {
      if (item.isActive) {
        acc.push({
          _id: item?._id,
          firebaseUid: item?.firebaseUid,
          accessRoleType: item?.accessRoleType && formattedRoleType[item.accessRoleType],
          email: item?.email,
          name: `${capitalizeFirstLetter(item?.firstName)} ${capitalizeFirstLetter(
            item?.lastName,
          )}`,
          location: item?.location,
          birthDate: item?.birthDate.toString(),
          active: item?.isActive.toString(),
        });
      }
      return acc;
    }, []);
  }, [userList]);

  const [filteredList, setFilteredList] = React.useState(activeUsers);
  const userError = useSelector((state: RootState) => state.user?.error);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setFilteredList(activeUsers);
  }, [userList]);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      birthDate: new Date(Date.now()),
      isActive: true,
    },
    mode: 'onBlur',
    resolver: joiResolver(userValidation),
  });

  const onSubmit = (data) => {
    data = {
      ...data,
      birthDate: format(new Date(data?.birthDate), 'yyy/MM/dd'),
    };
    dispatch(addUser(data));
    onClose();
  };

  const onClose = () => {
    reset();
    dispatch(closeFormModal());
  };

  const handleDelete = (data) => {
    dispatch(deleteUser(data._id));
  };

  const buttonsArray: TableButton<UserData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        dispatch(openModal());
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const showErrorMessage = userError?.networkError || !activeUsers.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Usuarios}
      handleReload={() => handleNavigation('/admin/clients')}
      handleAdd={() => handleNavigation('/admin/clients/add')}
      error={userError}
    />
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.welcomeMessage}>
          <Typography variant="h1">¡Bienvenido {superAdmin.name}!</Typography>
          <p>¡Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
        </div>
        <div className={styles.topTableContainer}>
          <div className={styles.searchBar}>
            <SearchBar<SearchUserData>
              setFilteredList={setFilteredList}
              details={activeUsers}
              mainArray={userFilterOptions}
            />
          </div>
          <div className={styles.addUserButton}>
            <Button
              materialVariant={Variant.CONTAINED}
              onClick={() => dispatch(openFormModal())}
              label={'+ Agregar un nuevo usuario'}
              testId={'addUserButton'}
            />
          </div>
        </div>
        <div className={styles.tableContainer}>
          {filteredList.length ? (
            <Table<UserData>
              showButtons
              testId={'userTable'}
              headers={userHeaders}
              value={filteredList}
              buttons={buttonsArray}
            />
          ) : (
            <>
              <div className={styles.notFound}>
                <div className={styles.notFoundTitle}>
                  No han encontrado resultados que coincidan con tu búsqueda
                </div>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/searchNotFound.png`}
                    alt="Not found"
                  ></img>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.modalContainer}>
        <Modal
          onClose={() => dispatch(closeFormModal())}
          isOpen={showFormModal}
          testId="add-user-modal"
        >
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
      {!showErrorMessage && (
        <Modal
          testId={'User-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AccessRoleModal row={row} open={showModal} />
        </Modal>
      )}
    </>
  );
};

export default Users;
