import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';

import { FormValues } from './types';

const StoryBook = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      FirstName: '',
      LastName: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Data: ', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} testId={'fn-input'} name="FirstName" type={'text'} />
        <Input control={control} testId={'ln-input'} name="LastName" type={'text'} />
        <Button
          materialVariant={Variant.CONTAINED}
          label="SUBMIT"
          onClick={handleSubmit(onSubmit)}
        ></Button>
        <Button materialVariant={Variant.OUTLINED} label="RESET" onClick={() => reset()}></Button>{' '}
        <Button
          materialVariant={Variant.TEXT}
          label="TEXT"
          onClick={() => console.log('Hi')}
        ></Button>
      </form>
    </div>
  );
};

export default StoryBook;
