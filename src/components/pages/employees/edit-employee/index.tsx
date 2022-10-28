import React from 'react';
import { useForm } from 'react-hook-form';

import { FormValues, Seniority } from 'src/components/pages/employees/types';
import { PotentialRole } from 'src/components/pages/storybook/types';
import { DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';

import styles from './employee-edit.module.css';

const seniority = [
  { value: 'JR', label: 'JR' },
  { value: 'SSR', label: 'SSR' },
  { value: 'SR', label: 'SR' },
];

const arraySkills: string[] = ['React', 'Redux', 'CSS', 'Vue'];

const checkboxData: PotentialRole[] = [
  { label: 'TL', value: 'TL' },
  { label: 'PM', value: 'PM' },
  { label: 'DEV', value: 'DEV' },
  { label: 'QA', value: 'QA' },
  { label: 'UXUI', value: 'UXUI' },
];

const EditEmployee = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      seniority: Seniority.JR,
      skills: [],
      potentialRole: [],
      disponibility: 0,
      historyProjects: [],
      carreerPlan: '',
      notes: '',
    },
    mode: 'onBlur',
  });
  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        <div className={styles.wrapperContainer}>
          <div className={styles.textInputContainer}>
            <div className={styles.textInput}>
              <TextInput
                control={control}
                testId={'firstName-input'}
                label="Nombre"
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
                testId={'lastName-input'}
                label="Apellido"
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
                label="Email"
                name="email"
                type={'text'}
                variant="outlined"
                error
                fullWidth
              />
            </div>
          </div>
          <div className={styles.textInputContainer}>
            <div className={styles.textInput}>
              <DatePicker
                label={'Fecha de cumpleaños'}
                testId={'datePickerTestId'}
                name="dateOfBirth"
                control={control}
                error
              />
            </div>
            <div className={styles.textInput}>
              <Dropdown
                control={control}
                testId={'seniority-dropdown'}
                label="Seniority"
                name="seniority"
                options={seniority}
                error
                fullWidth
              />
            </div>
            <div className={styles.textInput}>
              <AutocompleteInput control={control} name={'skills'} skills={arraySkills} />
            </div>
          </div>
        </div>
        <div className={styles.secondWrapperContainer}>
          <div className={styles.checkboxContainer}>
            <h3>Rol potencial</h3>
            <CheckboxInput
              testId={'checkbox'}
              name="potentialRole"
              control={control}
              options={checkboxData}
            />
          </div>
          <div>
            <h3>Disponibilidad</h3>
            <TextInput
              control={control}
              testId={'disponibility-input'}
              label="Disponibilidad"
              name="disponibility"
              type={'number'}
              variant="outlined"
              error
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightInputs}>
          <TextInput
            control={control}
            testId={'projects-input'}
            label="Proyectos"
            name="historyProjects"
            type={'text'}
            variant="outlined"
            error
            fullWidth
          />
        </div>
        <div className={styles.rightInputs}>
          <TextInput
            control={control}
            testId={'carreer-plan-input'}
            label="Plan de Carrera"
            name="carreerPlan"
            type={'text'}
            variant="outlined"
            error
            fullWidth
            multiline
            maxRows={5}
          />
        </div>
        <div className={styles.rightInputs}>
          <TextInput
            control={control}
            testId={'notes-input'}
            label="Notas"
            name="notes"
            type={'text'}
            variant="outlined"
            error
            fullWidth
            multiline
            maxRows={5}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
