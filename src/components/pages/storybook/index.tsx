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

  const header: Headers[] = [
    { header: 'Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Access Role', key: 'accessRoleType' },
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
