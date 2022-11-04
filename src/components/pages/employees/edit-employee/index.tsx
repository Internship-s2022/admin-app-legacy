import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { FormValues, Seniority } from 'src/components/pages/employees/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ToggleButton from 'src/components/shared/ui/buttons/toggle-button';
import BellIcon from 'src/components/shared/ui/icons/bellIcon/bellIcon';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { editEmployee } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import { arraySkills, checkboxData, projectHeadersEmp, seniority } from './constants';
import styles from './editEmployee.module.css';
import editEmployeeValidations from './validations';

const EditEmployee = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useAppDispatch();
  const params = useParams();

  const [selected, setSelected] = React.useState(false);
  const listEmployee = useAppSelector((state: RootState) => state.employee?.list);

  useEffect(() => {
    if (listEmployee.length && matchedEmployee?._id) {
      reset({
        id: matchedEmployee?._id,
        user: {
          _id: matchedEmployee?.user?._id,
          firstName: matchedEmployee?.user?.firstName,
          lastName: matchedEmployee?.user?.lastName,
          email: matchedEmployee?.user?.email,
          birthDate: matchedEmployee?.user?.birthDate,
        },
        seniority: matchedEmployee?.seniority as Seniority,
        skills: matchedEmployee?.skills || [],
        potentialRole: matchedEmployee?.potentialRole,
        availability: false,
        projectHistory: [],
        careerPlan: matchedEmployee?.careerPlan,
        notes: matchedEmployee?.notes,
      });
    } else {
      navigate('/admin/employees');
    }
  }, []);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      id: '',
      user: {
        birthDate: new Date(Date.now()),
        email: '',
        firstName: '',
        lastName: '',
        _id: '',
      },
      seniority: Seniority.JR,
      skills: [],
      potentialRole: [],
      availability: false,
      projectHistory: [],
      careerPlan: '',
      notes: '',
    },
    mode: 'onBlur',
    resolver: joiResolver(editEmployeeValidations),
  });

  const matchedEmployee = listEmployee?.find((item) => item?._id === params.id);
  const latestProjects = matchedEmployee?.projectHistory.slice(-2);

  const formattedProjects = latestProjects?.map((item) => ({
    id: item?.project?._id ? item?.project?._id : '-',
    name: item?.project?.projectName ? item?.project?.projectName : '-',
    role: item?.role ? item?.role : '-',
    startDate: item?.startDate ? item?.startDate : '-',
    endDate: item?.endDate ? item?.endDate : '-',
  }));

  const handleToggleChange = (checked: boolean): void => {
    setSelected(checked);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const onSubmit = async (data) => {
    const { id, user, projectHistory, ...rest } = data;
    await dispatch(editEmployee({ body: rest, id: id }));
    navigate('/admin/employees');
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>Editar un empleado</div>
        <div className={styles.bellIcon}>
          <BellIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <div className={styles.leftSide}>
            <div className={styles.firstColumn}>
              <div className={styles.elementContainer}>
                <TextInput
                  control={control}
                  testId={'firstNameInput'}
                  label="Nombre"
                  name="user.firstName"
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
                  name="user.birthDate"
                  control={control}
                  disabled
                  disableFuture
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
                  name="user.lastName"
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
                  name="user.email"
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
                    {projectHeadersEmp?.map((header, index) => {
                      return (
                        <th className={styles.header} key={index}>
                          {header.header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {formattedProjects?.map((data) => {
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
              onClick={() => handleNavigation('/admin/employees')}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={handleSubmit(onSubmit)}
              label="Confirmar"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;