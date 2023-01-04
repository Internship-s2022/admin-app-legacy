import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconButton } from '@mui/material';

import { Motives } from 'src/components/pages/employees/employeeForm/absencesModal/types';
import { FormValues, Projects, Seniority } from 'src/components/pages/employees/types';
import CustomNotifications from 'src/components/shared/common/customNotificationForm';
import { Resource } from 'src/components/shared/common/customNotificationForm/types';
import {
  Button,
  ConfirmationMessage,
  DatePicker,
  Dropdown,
  Modal,
  SuccessErrorMessage,
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import ToggleButton from 'src/components/shared/ui/buttons/toggle-button';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import DeleteIcon from 'src/components/shared/ui/icons/tableIcons/deleteIcon';
import AutocompleteChip from 'src/components/shared/ui/inputs/autocompleteChip';
import CheckboxInput from 'src/components/shared/ui/inputs/checkbox';
import { UiRoutes } from 'src/constants';
import { editEmployee, getEmployeeById } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeFormModal,
  closeModal,
  openConfirmationModal,
  openFormModal,
  openModal,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import AbsencesModal from './absencesModal';
import { arraySkills, checkboxData, seniority } from './constants';
import styles from './editEmployee.module.css';
import TableProject from './tableProject';
import employeeValidations from './validations';

const EditEmployee = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch<null> = useAppDispatch();
  const params = useParams();

  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);
  const showModal = useAppSelector((state: RootState) => state.ui.showModal);
  const showNotificationModal = useAppSelector((state: RootState) => state.ui.showFormModal);
  const selectedEmployee = useAppSelector((state: RootState) => state.employee?.selectedEmployee);
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const notificationError = useAppSelector((state: RootState) => state.notification.error);

  const latestProjects = selectedEmployee?.projectHistory?.slice(-2);

  const formattedProjects = latestProjects?.map((item: Projects) => ({
    id: item?.project?._id || '-',
    name: item?.project?.projectName || '-',
    role: item?.role ? item?.role : '-',
    startDate: item?.startDate || '-',
    endDate: item?.endDate || '-',
  }));

  useEffect(() => {
    if (!Object.keys(selectedEmployee).length) {
      params.id && dispatch(getEmployeeById(params.id));
    }
  }, []);

  const [absences, setAbsences] = React.useState(selectedEmployee?.absences || []);

  const {
    formState: { isDirty },
    handleSubmit,
    control,
    reset,
  } = useForm<FormValues>({
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

  const formChanged = isDirty;

  useEffect(() => {
    if (Object.keys(selectedEmployee).length) {
      reset({
        id: selectedEmployee?._id,
        user: {
          _id: selectedEmployee?.user?._id,
          firstName: selectedEmployee?.user?.firstName,
          lastName: selectedEmployee?.user?.lastName,
          email: selectedEmployee?.user?.email,
          birthDate: selectedEmployee?.user?.birthDate,
        },
        seniority: selectedEmployee?.seniority as Seniority,
        skills: selectedEmployee?.skills || [],
        potentialRole: selectedEmployee?.potentialRole,
        availability: selectedEmployee?.availability,
        projectHistory: [],
        careerPlan: selectedEmployee?.careerPlan,
        notes: selectedEmployee?.notes,
      });
      setAbsences(selectedEmployee?.absences || []);
    }
  }, [selectedEmployee]);

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
        <div className={styles.bellIcon} onClick={() => dispatch(openFormModal())}>
          <BellIcon color={'#373867'} />
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
                    <div className={styles.absenceTitle}>Ausencias Programadas</div>
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
                              <span>{`${motiveLabel(item.motive)}:`}</span>
                              <div className={styles.absencesDate}>
                                <span>{format(new Date(item?.startDate), 'dd/MM/yyyy')}</span>
                                <span>-</span>
                                <span>{format(new Date(item?.endDate), 'dd/MM/yyyy')}</span>
                              </div>
                              <IconButton
                                key={index}
                                onClick={(e) => handleAbsenceDelete(e, index)}
                              >
                                <DeleteIcon />
                              </IconButton>
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
                <AutocompleteChip control={control} name={'skills'} skills={arraySkills} />{' '}
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <TableProject projectList={formattedProjects} />
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
              disabled={!formChanged}
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
      <div>
        <Modal
          testId={'employee-custom-notification'}
          isOpen={showNotificationModal}
          onClose={() => dispatch(closeFormModal())}
        >
          <CustomNotifications resource={Resource.EMPLOYEE} id={params.id} />
        </Modal>
      </div>
      <Modal
        testId="editEmployeeModal"
        styles={styles.modal}
        isOpen={!showNotificationModal && showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea editar al empleado ${selectedEmployee?.user?.firstName} ${selectedEmployee?.user?.lastName}?`}
          title={'Editar Empleado'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
      <SuccessErrorMessage
        open={showAlert}
        error={notificationError}
        resource={Resources.Notificaciones}
        operation={snackbarOperation}
      />
    </div>
  );
};

export default EditEmployee;
