import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button, Input, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';

import styles from './index.module.css';
import { FormValues } from './types';

const StoryBook = () => {
  type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
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
          label="pum"
        />
        <Modal onClose={setOpen} isOpen={open} testId="testId">
          <div>
            <p>pum</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StoryBook;
