import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';
import { User } from 'src/redux/user/types';
import { AppDispatch } from 'src/types';

import { Headers } from '../../shared/ui/table/types';
import styles from './index.module.css';
import { FormValues } from './types';

const StoryBook = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      FirstName: '',
      LastName: '',
    },
    mode: 'onChange',
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

  console.log('usuarios', listUserData);

  const onSubmit = (data) => {
    console.log('Data: ', data);
  };

  const header: Headers[] = [
    { header: 'Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Access Role', key: 'accessRoleType' },
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} testId={'fn-input'} name="FirstName" type={'text'} />
        <Input control={control} testId={'ln-input'} name="LastName" type={'text'} />
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
            label="RESET"
            onClick={() => reset()}
          ></Button>{' '}
        </div>
      </form>
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
        buttonLabel={'Editar Acceso'}
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
