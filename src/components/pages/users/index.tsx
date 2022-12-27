import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import {
  Button,
  ConfirmationMessage,
  Modal,
  SuccessErrorMessage,
  Table,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeFormModal,
  closeMessageAlert,
  closeModal,
  openConfirmationModal,
  openFormModal,
  openModal,
  setSnackbarOperation,
} from 'src/redux/ui/actions';
import { deleteUser, editUser, getUsers } from 'src/redux/user/thunks';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { TableButton } from '../../shared/ui/table/types';
import AccessRoleModal from './AccessRoleModal';
import { accessRoles, userFilterOptions, userHeaders } from './constants';
import { SearchUserData, UserData } from './types';
import UserForm from './userForm';
import styles from './users.module.css';

const filterData = (list, filters) => {
  let filterDataList;

  filterDataList = list.filter((item) => item.active === filters.isActive);

  filterDataList = filterDataList.filter((item) => item.accessRoleType?.includes(filters.role));

  if (filters.search) {
    filterDataList = filterDataList?.filter((d) =>
      userFilterOptions.some((field) =>
        d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
      ),
    );
  }

  return filterDataList;
};

const Users = () => {
  const [row, setRow] = React.useState({} as UserData);
  const [filters, setFilters] = React.useState({
    isActive: true,
    role: '',
    search: '',
  });

  const [dataList, setDataList] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);
  const showModal = useAppSelector((state: RootState) => state.ui.showModal);
  const showFormModal = useAppSelector((state: RootState) => state.ui.showFormModal);
  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);
  const superAdmin = useAppSelector((state: RootState) => state.auth.authUser);
  const userList = useAppSelector((state: RootState) => state.user.list);
  const userError = useAppSelector((state: RootState) => state.user.error);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const confirmationTitle = filters.isActive ? 'Desactivar usuario' : 'Activar Usuario';
  const confirmationDescription = filters.isActive
    ? `¿Desea desactivar al usuario ${row.name}?`
    : `¿Desea activar al usuario ${row.name}?`;

  const navigate = useNavigate();

  const dispatch: AppDispatch<null> = useAppDispatch();

  const activeUsers = useMemo(() => {
    const mappedUser = userList.reduce((acc, item) => {
      if (item.accessRoleType !== AccessRoleType.SUPER_ADMIN) {
        acc.push({
          _id: item?._id,
          firebaseUid: item?.firebaseUid,
          accessRoleType: item?.accessRoleType && formattedRoleType[item.accessRoleType],
          email: item?.email,
          name: `${capitalizeFirstLetter(item?.firstName)} ${capitalizeFirstLetter(
            item?.lastName,
          )}`,
          location: item?.location,
          birthDate: item?.birthDate?.toString(),
          active: item?.isActive,
        });
      }
      return acc;
    }, []);
    const filteredData = filterData(mappedUser, filters);
    return filteredData;
  }, [userList, filters.isActive, filters.role, filters.search]);

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  useEffect(() => {
    setDataList(activeUsers);
  }, [userList, filters.isActive, filters.role, filters.search]);

  const handleDelete = (data) => {
    dispatch(deleteUser(data._id));
    dispatch(closeConfirmationModal());
    dispatch(setSnackbarOperation('inactivado'));
  };

  const handleEdit = (data) => {
    dispatch(openModal());
    dispatch(setSnackbarOperation('editado'));
    setRow(data);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleActivate = (data) => {
    dispatch(editUser(data));
    dispatch(closeConfirmationModal());
    dispatch(setSnackbarOperation('activado'));
  };

  const options = {
    id: row._id,
    body: {
      isActive: true,
    },
  };

  const buttonsArray: TableButton<UserData>[] = filters.isActive
    ? [
        {
          active: true,
          label: 'editar',
          testId: 'edit-button',
          variant: Variant.CONTAINED,
          onClick: (data) => {
            handleEdit(data);
          },
        },
        {
          active: true,
          label: 'X',
          testId: 'delete-button',
          variant: Variant.CONTAINED,
          onClick: (data) => {
            dispatch(openConfirmationModal());
            setRow(data);
          },
        },
      ]
    : [
        {
          active: true,
          label: 'Activar',
          testId: 'activate-button',
          variant: Variant.TEXT,
          onClick: (data) => {
            dispatch(openConfirmationModal());
            setRow(data);
          },
        },
      ];

  const showErrorMessage = userError?.networkError || !userList.length;

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
          <Typography data-testid="user-welcome-title" variant="h1">
            ¡Bienvenido {superAdmin.name}!
          </Typography>
          <p data-testid="user-subtitle">
            Esta es la lista de usuarios. Puedes asignarles el acceso que desees.
          </p>
        </div>
        <div className={styles.topTableContainer}>
          <div className={styles.searchBar}>
            <SearchBar<SearchUserData>
              setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
              filter={filters.search}
            />
          </div>
          <div className={styles.addUserButton}>
            <Button
              materialVariant={Variant.CONTAINED}
              onClick={() => {
                dispatch(openFormModal());
                dispatch(setSnackbarOperation('agregado'));
              }}
              label={'+ Agregar un nuevo usuario'}
              testId={'add-user-button'}
            />
          </div>
        </div>
        <div className={styles.checkboxInput}>
          {checked ? (
            <div className={styles.filterButtonsPressed}>
              <Button
                materialVariant={Variant.CONTAINED}
                onClick={() => {
                  setFilters({ ...filters, isActive: !filters.isActive });
                  setChecked(!checked);
                }}
                label={'Inactivos'}
                testId={'inactive-filter-button'}
                color={'warning'}
              />
            </div>
          ) : (
            <div className={styles.filterButtons}>
              <Button
                materialVariant={Variant.TEXT}
                onClick={() => {
                  setFilters({ ...filters, isActive: !filters.isActive });
                  setChecked(!checked);
                }}
                label={'Inactivos'}
                testId={'inactive-filter-button'}
              />
            </div>
          )}
          <select
            className={styles.filterDropdown}
            data-testid="role-dropdown"
            onChange={(e) => {
              setFilters({ ...filters, role: formattedRoleType[e.target.value] });
            }}
          >
            <option value={''} disabled selected={filters.role === ''} className={styles.option}>
              {'Rol de acceso'}
            </option>
            {accessRoles.map((item) => (
              <option
                data-testid={item.label}
                key={item.value}
                value={item.value}
                className={styles.option}
              >
                {item.label}
              </option>
            ))}
          </select>
          <div className={styles.filterButtons}>
            <Button
              materialVariant={Variant.TEXT}
              onClick={() => {
                setFilters({ isActive: true, role: '', search: '' });
                setChecked(false);
              }}
              label={'Resetear filtros'}
              testId={'reset-filter-button'}
            />
          </div>
        </div>
        <div className={styles.tableContainer}>
          {dataList?.length ? (
            <Table<UserData>
              showButtons
              testId={'user-table'}
              headers={userHeaders}
              value={dataList}
              buttons={buttonsArray}
              setDataList={setDataList}
              isActive={filters.isActive}
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
          <UserForm />
        </Modal>
      </div>
      <SuccessErrorMessage
        open={showAlert}
        error={userError}
        resource={Resources.Usuarios}
        operation={snackbarOperation}
      />
      {!showErrorMessage && (
        <Modal
          testId={'user-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AccessRoleModal row={row} open={showModal} />
        </Modal>
      )}
      <Modal
        testId="delete-user-modal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={confirmationDescription}
          title={confirmationTitle}
          handleConfirm={() => (filters.isActive ? handleDelete(row) : handleActivate(options))}
          handleClose={() => dispatch(closeConfirmationModal())}
          testIdDescription="delete-modal-desc"
          testIdTitle="delete-modal-title"
        />
      </Modal>
    </>
  );
};

export default Users;
