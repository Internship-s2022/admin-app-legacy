import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { FormValues, Projects, Seniority } from 'src/components/pages/employees/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ToggleButton from 'src/components/shared/ui/buttons/toggle-button';
import BellIcon from 'src/components/shared/ui/icons/bellIcon/bellIcon';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { RootState } from 'src/redux/store';
import { formattedTableData } from 'src/utils/formatters';

import { projects } from '../constants';
import { arraySkills, checkboxData, projectHeadersEmp, seniority } from './constans';
import styles from './editEmployee.module.css';
import editEmployeeValidations from './validations';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      seniority: Seniority.JR,
      skills: [],
      potentialRole: [],
      availability: false,
      historyProjects: [],
      careerPlan: '',
      notes: '',
    },
    mode: 'onBlur',
    resolver: joiResolver(editEmployeeValidations),
  });

  const [selected, setSelected] = React.useState(false);
  const listEmployee = useSelector((state: RootState) => state.employee?.list);

  const handleToggleChange = (checked: boolean): void => {
    setSelected(checked);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user.firstName} ${employee.user.lastName}`,
    projects: formattedTableData<Projects>(projects, 'name'),
  }));

  const lastestEmployees = matchedEmployee.slice(-2);

  const onSubmit = () => {
    console.log('test');
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>Editar un empleado</div>
        <div className={styles.bellIcon}>
          <BellIcon />
        </div>
      </div>
      <form>
        <div className={styles.formContainer}>
          <div className={styles.leftSide}>
            <div className={styles.firstColumn}>
              <div className={styles.elementContainer}>
                <TextInput
                  control={control}
                  testId={'firstNameInput'}
                  label="Nombre"
                  name="firstName"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>
              <div className={styles.elementContainer}>
                <DatePicker
                  label={'Fecha de cumpleaños'}
                  testId={'datePickerTestId'}
                  name="dateOfBirth"
                  control={control}
                />
              </div>
              <div className={`${styles.elementContainer} ${styles.lastRowOfContainer}`}>
                <div className={styles.titles}>Rol potencial</div>
                <CheckboxInput
                  testId={'checkboxInput'}
                  name="potentialRole"
                  control={control}
                  options={checkboxData}
                />
              </div>
            </div>
            <div className={styles.middleColumn}>
              <div className={styles.elementContainer}>
                <TextInput
                  control={control}
                  testId={'lastNameInput'}
                  label="Apellido"
                  name="lastName"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>
              <div className={styles.elementContainer}>
                <Dropdown
                  control={control}
                  testId={'seniorityDropdown'}
                  label="Seniority"
                  name="seniority"
                  options={seniority}
                  fullWidth
                />
              </div>
              <div className={`${styles.elementContainer} ${styles.lastRowOfContainer}`}>
                <div className={styles.availability}>Disponibilidad</div>
                <ToggleButton
                  handleChange={handleToggleChange}
                  testId="toggleButtonTestId"
                  checked={selected}
                  name="availability"
                />
                <div className={styles.addAbsenceContainer}>
                  <div className={styles.absenceTitle}>Ausencias</div>
                  <div className={styles.buttonAbsences}>
                    <Button
                      testId="absencesButton"
                      materialVariant={Variant.CONTAINED}
                      onClick={() => undefined}
                      label="+ Agregar ausencias"
                      styles={styles.buttonText}
                    />
                  </div>
                </div>
                <div className={styles.noAbsences}>No hay ausencias programadas</div>
              </div>
            </div>
            <div className={styles.thirdColumn}>
              <div className={styles.elementContainer}>
                <TextInput
                  control={control}
                  testId={'emailInput'}
                  label="Email"
                  name="email"
                  type={'text'}
                  variant="outlined"
                  disabled
                />
              </div>
              <div className={styles.elementContainer}>
                <AutocompleteInput control={control} name={'skills'} skills={arraySkills} />{' '}
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.tableContainer}>
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
                  testId="viewMoreButton"
                  materialVariant={Variant.TEXT}
                  onClick={() => undefined}
                  label="Ver más"
                />
              </div>
            </div>
            <div>
              <div className={styles.rightInputs}>
                <TextInput
                  control={control}
                  testId={'careerPlanInput'}
                  label="Plan de Carrera"
                  name="careerPlan"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                />
              </div>
              <div className={styles.rightInputs}>
                <TextInput
                  control={control}
                  testId={'notesInput'}
                  label="Notas"
                  name="notes"
                  type={'text'}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <Button
              testId="cancelButton"
              materialVariant={Variant.OUTLINED}
              onClick={() => handleNavigation('/employees')}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={() => handleSubmit(onSubmit)}
              label="Confirmar"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
