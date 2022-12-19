import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  Button,
  DatePicker,
  Dropdown,
  Modal,
  Table,
  TextInput,
  ToggleButton,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { AccessRoleType, dropdownAccessRoles as accessRoles } from 'src/constants';
import { getUsers } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { storybookHeaders, tableValues } from './constants';
import styles from './index.module.css';
import { FormValues, MappedUserList, PotentialRole } from './types';
import { storybookValidation } from './validations';

const StoryBook = (): JSX.Element => {
  const dispatch: AppDispatch<null> = useDispatch();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      accessRoleType: AccessRoleType.EMPLOYEE,
      email: '',
      date: undefined,
      skills: [],
      potentialRole: [],
      availability: false,
    },
    mode: 'all',
    resolver: joiResolver(storybookValidation),
  });

  const arraySkills: string[] = ['React', 'Redux', 'CSS', 'Vue'];
  const checkboxData: PotentialRole[] = [
    { label: 'TL', value: 'TL' },
    { label: 'PM', value: 'PM' },
    { label: 'DEV', value: 'DEV' },
    { label: 'QA', value: 'QA' },
    { label: 'UXUI', value: 'UXUI' },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data) => console.log('data', data);

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
          <h3>Toggle button</h3>
          <ToggleButton control={control} name="availability" testId="toggleButtonTestId" />
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
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
              <DatePicker
                label={'date picker'}
                testId={'datePickerTestId'}
                name="date"
                control={control}
                error
              />
            </div>
          </div>
          <div>
            <div className={styles.inputsSecondaryContainer}>
              <div className={styles.inputsTopContainer}>
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
                    testId={'lastNameInput'}
                    label="Standard Input"
                    name="lastName"
                    type={'text'}
                    variant="standard"
                    error
                    fullWidth
                  />
                </div>
              </div>
              <div className={styles.inputsBottomContainer}>
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
            <div className={styles.checkbox}>
              <CheckboxInput
                testId={'checkbox'}
                label="example"
                name="potentialRole"
                control={control}
                options={checkboxData}
              />
            </div>
          </div>
          <div>
            <Button
              testId={'submit-button'}
              materialVariant={Variant.CONTAINED}
              label="Confirmar"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
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
