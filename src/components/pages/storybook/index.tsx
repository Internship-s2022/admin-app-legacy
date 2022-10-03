import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { AccessRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';
import { User } from 'src/redux/user/types';
import { AppDispatch } from 'src/types';

import { Headers } from '../../shared/ui/table/types';
import styles from './index.module.css';
import { FormValues } from './types';
import { storybookValidation } from './validations';

const StoryBook = () => {
  const dispatch: AppDispatch<null> = useDispatch();
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

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const listUser = useSelector((state: RootState) => state.user?.users);
  const [open, setOpen] = React.useState(false);

  const listUserData = listUser.map((item) => {
    return {
      id: item?._id,
      firstName: item?.firstName,
      lastName: item?.lastName,
      accessRoleType: item?.accessRoleType,
    };
  });

  const onSubmit = (data) => {
    console.log('Data: ', data);
  };
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const header: Headers[] = [
    { header: 'Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Access Role', key: 'accessRoleType' },
  ];

  const accessRoles = [
    { value: 'MANAGER', label: 'Manager' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
  ];

  return (
    <div className={styles.container}>
      <div>
        <Button
          testId="pum-btn"
          materialVariant={Variant.TEXT}
          onClick={() => setOpen(true)}
          label="TEXT"
        />
        <Modal onClose={setOpen} isOpen={open} testId="testId">
          <div>
            <p>This is a modal</p>
          </div>
        </Modal>
      </div>
      <div>
        <Button
          testId="add-btn"
          materialVariant={Variant.TEXT}
          onClick={() => setOpen(true)}
          label="Agregar usuario"
        />
        <Modal onClose={setOpen} isOpen={open} testId="testId">
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                control={control}
                testId={'firebase-input'}
                label="Firebase Uid"
                name="firebaseUid"
                type={'text'}
                variant="standard"
                error
              />
              <TextInput
                control={control}
                testId={'access-role-input'}
                label="Access role"
                name="accessRole"
                type={'text'}
                variant="filled"
                error
              />
              <TextInput
                control={control}
                testId={'email-input'}
                label="Email"
                name="email"
                type={'text'}
                variant="outlined"
                error
              />
              <TextInput
                control={control}
                testId={'first-name-input'}
                label="First name"
                name="firstName"
                type={'text'}
                error
              />
              <TextInput
                control={control}
                testId={'last-name-input'}
                label="Last name"
                name="lastName"
                type={'text'}
                error
              />
              <TextInput
                control={control}
                testId={'location-input'}
                label="Location"
                name="location"
                type={'text'}
                error
              />
              <TextInput
                control={control}
                testId={'date-input'}
                name="birthDate"
                type="date"
                error
              />
              <div className={styles.buttonsContainer}>
                <Button
                  testId="submit-btn"
                  materialVariant={Variant.CONTAINED}
                  label="SUBMIT"
                  onClick={handleSubmit(onSubmit)}
                ></Button>
                <Button
                  testId="reset-btn"
                  materialVariant={Variant.OUTLINED}
                  label="Cancel"
                  onClick={() => onClose()}
                ></Button>{' '}
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Table<User>
        showButtons={true}
        buttonVariant={Variant.CONTAINED}
        buttonLabel={'Change access'}
        buttonTestId={'table-button'}
        testId={'userTable'}
        headers={header}
        value={listUserData}
        onClick={() => setOpen(true)}
      />
    </div>
  );
};

export default StoryBook;
