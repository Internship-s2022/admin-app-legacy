import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import {
  Button,
  ConfirmationMessage,
  Dropdown,
  Modal,
  SuccessErrorMessage,
  Table,
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeFormModal,
  closeMessageAlert,
  closeModal,
  openConfirmationModal,
  openFormModal,
  openModal,
} from 'src/redux/ui/actions';
import { deleteUser, getUsers } from 'src/redux/user/thunks';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { TableButton } from '../../shared/ui/table/types';
import AccessRoleModal from './AccessRoleModal';
import { accessRoles, userFilterOptions, userHeaders } from './constants';
import { SearchUserData, UserData } from './types';
import UserForm from './userForm';
import styles from './users.module.css';

const Users = () => {
  const [row, setRow] = React.useState({} as UserData);
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const showFormModal = useSelector((state: RootState) => state.ui.showFormModal);
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const superAdmin = useSelector((state: RootState) => state.auth.authUser);
  const userList = useSelector((state: RootState) => state.user.list);
  const userError = useSelector((state: RootState) => state.user.error);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const navigate = useNavigate();

  const dispatch: AppDispatch<null> = useDispatch();

  const activeUsers = useMemo(() => {
    return userList.reduce((acc, item) => {
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
          birthDate: item?.birthDate.toString(),
          active: item?.isActive,
        });
      }
      return acc;
    }, []);
  }, [userList]);

  const [filters, setFilters] = React.useState({
    isActive: true,
    role: '',
    search: '',
  });

  const [dataList, setDataList] = React.useState(activeUsers);
  const [operation, setOperation] = React.useState('');

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  useEffect(() => {
    setDataList(activeUsers);
  }, [userList]);

  const handleDelete = (data) => {
    dispatch(deleteUser(data._id));
    dispatch(closeConfirmationModal());
    setOperation('borrado');
  };

  const handleEdit = (data) => {
    dispatch(openModal());
    setOperation('editado');
    setRow(data);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const filterData = () => {
    let filterDataList;
    if (filters.role === 'Manager') {
      filterDataList = activeUsers.filter((item) => item.accessRoleType === 'Manager');
    }
    if (filters.role === 'Admin') {
      filterDataList = activeUsers.filter((item) => {
        return item.accessRoleType === 'Admin';
      });
    }
    if (filters.role === 'Employee') {
      filterDataList = activeUsers.filter((item) => {
        return item.accessRoleType === 'Employee';
      });
    }
    if (filters.role === 'Super Admin') {
      filterDataList = activeUsers.filter((item) => {
        return item.accessRoleType === 'Super Admin';
      });
    }
    if (filters.isActive) {
      filterDataList = activeUsers.filter((item) => {
        return item.active;
      });
    }
    if (filters.isActive === false) {
      filterDataList = activeUsers.filter((item) => {
        return item.active === false;
      });
    }

    if (filters.search) {
      filterDataList = filterDataList?.filter((d) =>
        userFilterOptions.some((field) =>
          d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
        ),
      );
    }

    setDataList(filterDataList);
  };

  console.log('asdsasd', filters);
  console.log('dataList', dataList);

  useEffect(() => {
    filterData();
  }, [filters.isActive, filters.role, filters.search]);

  const buttonsArray: TableButton<UserData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        handleEdit(data);
      },
    },
    {
      active: true,
      label: 'X',
      testId: 'deleteButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        dispatch(openConfirmationModal());
        setRow(data);
      },
    },
  ];

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
              setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
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
        <div className={styles.checkboxInput}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => setFilters({ ...filters, isActive: !filters.isActive })}
            label={'Inactivos'}
            testId={'inactiveButtons'}
          />
          <select
            onChange={(e) => {
              setFilters({ ...filters, role: formattedRoleType[e.target.value] });
            }}
          >
            {accessRoles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.tableContainer}>
          {dataList?.length ? (
            <Table<UserData>
              showButtons
              testId={'userTable'}
              headers={userHeaders}
              value={dataList}
              buttons={buttonsArray}
              setDataList={setDataList}
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
        operation={operation}
      />

      {!showErrorMessage && (
        <Modal
          testId={'User-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AccessRoleModal row={row} open={showModal} />
        </Modal>
      )}
      <Modal
        testId="deleteUserModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea eliminar al usuario ${row.name}?`}
          title={'Eliminar Usuario'}
          handleConfirm={() => handleDelete(row)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </>
  );
};

export default Users;
