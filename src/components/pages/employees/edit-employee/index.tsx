import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  EmployeeData,
  FormValues,
  MappedEmployeeData,
  Projects,
  Seniority,
} from 'src/components/pages/employees/types';
import { PotentialRole } from 'src/components/pages/storybook/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ToggleButton from 'src/components/shared/ui/buttons/toggle-button';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { RootState } from 'src/redux/store';
import { formattedTableData } from 'src/utils/formatters';

import { projects } from '../constants';
import { projectHeadersEmp } from './constans';
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
      disponibility: false,
      historyProjects: [],
      carreerPlan: '',
      notes: '',
    },
    mode: 'onBlur',
  });

  const [selected, setSelected] = React.useState(false);
  const listEmployee = useSelector((state: RootState) => state.employee?.list);

  const handleToggleChange = (checked: boolean): void => {
    setSelected(checked);
  };

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user.firstName} ${employee.user.lastName}`,
    projects: formattedTableData<Projects>(projects, 'name'),
  }));

  const lastestEmployees = matchedEmployee.slice(-2);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>Editar un empleado</div>
      <div className={styles.fieldsContainer}>
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
                  name="lastName"
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
              <div className={styles.titles}>Rol potencial</div>
              <CheckboxInput
                testId={'checkbox'}
                name="potentialRole"
                control={control}
                options={checkboxData}
              />
            </div>
            <div>
              <div className={styles.titles}>Disponibilidad</div>
              <ToggleButton
                handleChange={handleToggleChange}
                testId="toggleButtonTestId"
                checked={selected}
              />
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.pepito}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {projectHeadersEmp.map((header, index) => {
                    return (
                      <th className={styles.header} key={index}>
                        {header.header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {lastestEmployees.map((data) => {
                  return (
                    <tr key={data.id}>
                      {projectHeadersEmp.map((header, index) => {
                        return (
                          <td className={styles.rows} key={index}>
                            {data[header.key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.viewMore}>
              <Button
                testId="text-button"
                materialVariant={Variant.TEXT}
                onClick={() => undefined}
                label="Ver más"
              />
            </div>
          </div>
          <div className={styles.dropboxContainer}>
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
      </div>
      <div className={styles.buttonContainer}>
        <div>
          <Button
            testId="text-button"
            materialVariant={Variant.OUTLINED}
            onClick={() => undefined}
            label="Cancelar"
          />
        </div>
        <div>
          <Button
            testId="text-button"
            materialVariant={Variant.CONTAINED}
            onClick={() => undefined}
            label="Confirmar"
          />
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
