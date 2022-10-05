import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { AccessRoleType, formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { addUser, getUsers } from 'src/redux/user/thunks';
import { User } from 'src/redux/user/types';
import { AppDispatch } from 'src/types';

import { Headers } from '../../shared/ui/table/types';
import styles from './index.module.css';
import { FormValues, MappedUserList } from './types';
import { storybookValidation } from './validations';

const StoryBook = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const { control } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      date: undefined,
    },
    mode: 'onBlur',
    resolver: joiResolver(storybookValidation),
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [open, setOpen] = React.useState(false);

  // const handleDelete = (id) => {
  //   dispatch(deleteUser(id));
  // };

  const header: Headers[] = [
    { header: 'Nombre', key: 'firstName' },
    { header: 'Rol de acceso', key: 'accessRoleType' },
  ];

  const value: MappedUserList[] = [
    { firstName: 'Nicolas Lobos', accessRoleType: formattedRoleType.SUPER_ADMIN },
    { firstName: 'Samuel Trillo', accessRoleType: formattedRoleType.ADMIN },
    { firstName: 'Karen Soto', accessRoleType: formattedRoleType.EMPLOYEE },
    { firstName: 'Luciano Alarcon', accessRoleType: formattedRoleType.EMPLOYEE },
    { firstName: 'Juan Moreira', accessRoleType: formattedRoleType.EMPLOYEE },
    { firstName: 'Paula Rinaldi', accessRoleType: formattedRoleType.EMPLOYEE },
    { firstName: 'Alex Galindo', accessRoleType: formattedRoleType.EMPLOYEE },
  ];

  const accessRoles = [
    { value: 'MANAGER', label: 'Manager' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <div>
          <h3>Text button</h3>
          <Button
            testId="text-button"
            materialVariant={Variant.TEXT}
            onClick={() => undefined}
            label="Text"
          />
        </div>
        <div>
          <h3>Outlined button</h3>
          <Button
            testId="outlined-button"
            materialVariant={Variant.OUTLINED}
            onClick={() => undefined}
            label="Outlined"
          />
        </div>
        <div>
          <h3>Contained button</h3>
          <Button
            testId="contained-button"
            materialVariant={Variant.CONTAINED}
            onClick={() => undefined}
            label="Contained"
          />
        </div>
        <div>
          <h3>Modal</h3>
          <Modal onClose={setOpen} isOpen={open} styles={styles.storyBookModal} testId="testId">
            <div className={styles.modalContent}>Esto es un modal</div>
          </Modal>
          <Button
            testId="storybookModalButton"
            materialVariant={Variant.OUTLINED}
            onClick={() => setOpen(true)}
            label="Abrir Modal"
          />
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <h3>Inputs</h3>
        <div>
          <div className={styles.dropdown}>
            <Dropdown
              control={control}
              testId={'storybook-dropdown'}
              label="Dropdown"
              name="accessRoleType"
              options={accessRoles}
              fullWidth
              error
            />
          </div>
          <div className={styles.dateInput}>
            <TextInput
              styles={styles.dateInput}
              control={control}
              testId={'date-input'}
              name="date"
              type={'date'}
              variant="outlined"
              error
              fullWidth
            />
          </div>
        </div>
        <div>
          <div className={styles.textInput}>
            <TextInput
              control={control}
              testId={'name-input'}
              label="Outlined Input"
              name="firstName"
              type={'text'}
              variant="outlined"
              error
              fullWidth
            />
          </div>
          <div className={styles.textInput}>
            <TextInput
              control={control}
              testId={'email-input'}
              label="Standard Input"
              name="lastName"
              type={'text'}
              variant="standard"
              error
              fullWidth
            />
          </div>
          <div className={styles.textInput}>
            <TextInput
              control={control}
              testId={'email-input'}
              label="Filled Input"
              name="email"
              type={'text'}
              variant="filled"
              error
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <h3>Tabla con usuarios</h3>
        <Table<MappedUserList>
          showButtons={true}
          buttonVariant={Variant.CONTAINED}
          buttonLabel={'Change access'}
          buttonTestId={'table-button'}
          testId={'userTable'}
          headers={header}
          value={value}
          onClick={() => undefined}
        />
      </div>
    </div>
  );
};

export default StoryBook;
