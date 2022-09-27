import React from 'react';
import { useForm } from 'react-hook-form';

import Input from 'src/components/shared/ui/input';

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
        <button>Submit</button>
        <button onClick={() => reset()}>Reset</button>
      </form>
    </div>
  );
};

export default StoryBook;
