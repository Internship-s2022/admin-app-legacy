import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button, Input, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { getUsers } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

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

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data) => {
    console.log('Data: ', data);
  };

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
      <Table
        testId={'testingTable'}
        headers={['testing', 'headers']}
        value={[{ prop1: 'now', prop2: 'values' }]}
      />
    </div>
  );
};

export default StoryBook;
