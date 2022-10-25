import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Dropdown, Modal, Table, TextInput } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import { Variant } from 'src/components/shared/ui/button/types';
import { AccessRoleType, dropdownAccessRoles as accessRoles } from 'src/constants';
import { getUsers } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { storybookHeaders, tableValues } from './constants';
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
      skills: [],
    },
    mode: 'onBlur',
    resolver: joiResolver(storybookValidation),
  });

  const arraySkills: string[] = ['React', 'Redux', 'CSS', 'Vue'];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [open, setOpen] = React.useState(false);

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
          <div className={styles.textInput}>
            <AutocompleteInput
              testId={'autocompleteTestId'}
              control={control}
              name={'skills'}
              skills={arraySkills}
            />
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <h3>Tabla con usuarios</h3>
        <Table<MappedUserList>
          showButtons={false}
          testId={'userTable'}
          headers={storybookHeaders}
          value={tableValues}
        />
      </div>
    </div>
  );
};

export default StoryBook;
