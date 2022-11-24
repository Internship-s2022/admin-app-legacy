import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Motives } from 'src/components/pages/employees/edit-employee/absencesModal/types';
import { FormValues, Seniority } from 'src/components/pages/employees/types';
import {
  Button,
  ConfirmationMessage,
  DatePicker,
  Dropdown,
  Modal,
  SuccessErrorMessage,
  TextInput,
} from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/autocomplete';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ToggleButton from 'src/components/shared/ui/buttons/toggle-button';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { UiRoutes } from 'src/constants';
import { editEmployee } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeModal,
  openConfirmationModal,
  openModal,
  setOpenMessageAlert,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import AbsencesModal from './absencesModal';
import { arraySkills, checkboxData, projectHeadersEmp, seniority } from './constants';
import styles from './editEmployee.module.css';
import employeeValidations from './validations';

const EditEmployee = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useAppDispatch();
  const params = useParams();

  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);
  const showModal = useAppSelector((state: RootState) => state.ui?.showModal);
  const listEmployee = useAppSelector((state: RootState) => state.employee?.list);
  const matchedEmployee = listEmployee?.find((item) => item?._id === params.id);

  const latestProjects = matchedEmployee?.projectHistory.slice(-2);

  const formattedProjects = latestProjects?.map((item) => ({
    id: item?.project?._id || '-',
    name: item?.project?.projectName || '-',
    role: item?.role ? item?.role : '-',
    startDate: item?.startDate || '-',
    endDate: item?.endDate || '-',
  }));

  const [absences, setAbsences] = React.useState(matchedEmployee?.absences || []);

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
      availability: true,
      projectHistory: [],
      careerPlan: '',
      notes: '',
      absences: [],
    },
    mode: 'onBlur',
    resolver: joiResolver(employeeValidations),
  });

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
        availability: matchedEmployee?.availability,
        projectHistory: [],
        careerPlan: matchedEmployee?.careerPlan,
        notes: matchedEmployee?.notes,
        absences: matchedEmployee?.absences,
      });
    } else {
      navigate(`${UiRoutes.ADMIN}${UiRoutes.EMPLOYEES}`);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAbsence = (data) => {
    setAbsences(data);
  };

  const handleAbsenceDelete = (e, indexToDelete) => {
    e.preventDefault();
    const newData = absences.filter((_, index) => index !== indexToDelete);
    setAbsences(newData);
  };

  const motiveLabel = (item) => {
    switch (item) {
      case Motives.LICENSE:
        return 'Licencia';
      case Motives.STUDY:
        return 'Estudio';
      case Motives.VACATIONS:
        return 'Vacaciones';
    }
  };

  const onSubmit = async (data) => {
    const body = {
      ...data,
      absences: absences.map((item) => {
        return {
          startDate: item.startDate,
          endDate: item.endDate,
          motive: item.motive,
        };
      }),
    };
    const { id, user, projectHistory, ...rest } = body;
    await dispatch(editEmployee({ body: rest, id: id }));
    dispatch(closeConfirmationModal());
    navigate(`${UiRoutes.ADMIN}${UiRoutes.EMPLOYEES}`);
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
                <ToggleButton control={control} testId="toggleButtonTestId" name="availability" />
                <div className={styles.addAbsenceContainer}>
                  <div className={styles.absencesButton}>
                    <div className={styles.absenceTitle}>Ausencias</div>
                    <div className={styles.buttonAbsences}>
                      <Button
                        testId="absencesButton"
                        materialVariant={Variant.CONTAINED}
                        onClick={() => dispatch(openModal())}
                        label="+ Agregar ausencias"
                        styles={styles.buttonText}
                      />
                    </div>
                  </div>
                  <>
                    <div className={styles.absencesContainer}>
                      {absences.length ? (
                        absences.map((item, index) => {
                          return (
                            <div key={index} className={styles.newAbsences}>
                              {`${motiveLabel(item.motive)}: ${format(
                                new Date(item?.startDate),
                                'dd/MM/yyyy',
                              )} - ${format(new Date(item?.endDate), 'dd/MM/yyyy')}`}
                              <button
                                className={styles.deleteAbsence}
                                onClick={(e) => handleAbsenceDelete(e, index)}
                              >
                                X
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className={styles.noAbsences}>No hay ausencias programadas</div>
                      )}
                    </div>
                  </>
                </div>
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
              onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.EMPLOYEES}`)}
              label="Cancelar"
            />
          </div>
          <div>
            <Button
              testId="confirmButton"
              materialVariant={Variant.CONTAINED}
              onClick={() => dispatch(openConfirmationModal())}
              label="Confirmar"
            />
          </div>
        </div>
      </form>
      <div>
        <Modal
          testId={'employee-absences-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AbsencesModal setAbsence={handleAbsence} open={showModal} absences={absences} />
        </Modal>
      </div>
      <Modal
        testId="editEmployeeModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea editar al empleado ${matchedEmployee?.user?.firstName} ${matchedEmployee?.user?.lastName}?`}
          title={'Editar Empleado'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default EditEmployee;
