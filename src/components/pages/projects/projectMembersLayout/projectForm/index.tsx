import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Criticality, ProjectFormValues, ProjectType } from 'src/components/pages/projects/types';
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
import EndDateCheckbox from 'src/components/shared/ui/inputs/endDateCheckbox';
import { createProject, editProject, getProjectAndClients } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { closeConfirmationModal, openConfirmationModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import { criticalityOptions, projectTypeOptions } from './constants';
import styles from './projectForm.module.css';
import { ProjectFormProps } from './types';
import { projectValidation } from './validations';

const ProjectForm = (props: ProjectFormProps) => {
  const { children } = props;

  const { id } = useParams();
  const dispatch: AppDispatch<null> = useDispatch();

  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const membersList = useSelector((state: RootState) => state.member.list);
  const [endDateDisabled, setEndDateDisabled] = useState(false);

  const clientList = useSelector((state: RootState) =>
    state.client.list?.reduce((acc, item) => {
      if (item.isActive) {
        acc.push({ value: item._id, label: item.name });
      }
      return acc;
    }, []),
  );
  const projectError = useSelector((state: RootState) => state.project?.error);
  const operation = id ? 'editado' : 'agregado';

  const handleEndDateDisable = (data) => {
    setEndDateDisabled(data);
  };

  const { control, reset, handleSubmit } = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      clientName: '',
      startDate: null,
      endDate: null,
      projectType: ProjectType.STAFF_AUGMENTATION,
      isCritic: Criticality.ALTA,
      description: '',
      notes: '',
    },
    mode: 'onBlur',
    resolver: joiResolver(projectValidation),
  });

  const onSubmit = (data) => {
    const options = {
      id: id,
      body: JSON.stringify({
        projectName: data.projectName,
        clientName: data.clientName,
        startDate: data.startDate,
        endDate: endDateDisabled ? null : data.endDate,
        projectType: data.projectType,
        isCritic: data.isCritic,
        description: data.description,
        notes: data.notes,
      }),
    };
    id ? dispatch(editProject(options)) : dispatch(createProject(options));
    dispatch(closeConfirmationModal());
  };

  useEffect(() => {
    dispatch(getProjectAndClients(id));
  }, []);

  useEffect(() => {
    reset({
      projectName: selectedProject.projectName,
      clientName: selectedProject.clientName?._id,
      startDate: selectedProject.startDate,
      endDate: selectedProject.endDate,
      projectType: selectedProject.projectType as ProjectType,
      isCritic: selectedProject.isCritic as Criticality,
      description: selectedProject.description,
      notes: selectedProject.notes,
    });
    setEndDateDisabled(!selectedProject.endDate);
  }, [selectedProject]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <div className={styles.handleLeftContainer}>
            <div className={styles.leftSide}>
              <div className={styles.firstColumn}>
                <div className={styles.elementContainer}>
                  <TextInput
                    control={control}
                    testId={'projectName'}
                    label="Nombre del Proyecto"
                    name="projectName"
                    type={'text'}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className={styles.elementContainer}>
                  <Dropdown
                    control={control}
                    testId={'projectType'}
                    label="Tipo de Proyecto"
                    name="projectType"
                    options={projectTypeOptions}
                    fullWidth
                  />
                </div>
              </div>
              <div className={styles.middleColumn}>
                <div className={styles.elementContainer}>
                  <Dropdown
                    control={control}
                    testId={'clientName'}
                    label={'Cliente'}
                    name="clientName"
                    options={clientList}
                    fullWidth
                  />
                </div>
                <div className={styles.elementContainer}>
                  <Dropdown
                    control={control}
                    testId={'criticality'}
                    label="Criticidad"
                    name="isCritic"
                    options={criticalityOptions}
                    fullWidth
                  />
                </div>
              </div>
              <div className={styles.thirdColumn}>
                <div className={styles.dateContainer}>
                  <div className={styles.dateSelection}>
                    <DatePicker
                      label={'Inicio'}
                      testId={'startDate'}
                      name="startDate"
                      control={control}
                    />
                    <EndDateCheckbox
                      endDateDisabled={endDateDisabled}
                      handleEndDateDisable={handleEndDateDisable}
                      resource={Resources.Proyectos}
                    />
                  </div>
                  <div className={styles.dateSelection}>
                    <DatePicker
                      disabled={endDateDisabled}
                      label={'Fin'}
                      testId={'endDate'}
                      name="endDate"
                      control={control}
                    />
                  </div>
                </div>
                <div className={styles.saveButton}>
                  <Button
                    testId="saveButton"
                    materialVariant={Variant.CONTAINED}
                    onClick={id ? () => dispatch(openConfirmationModal()) : handleSubmit(onSubmit)}
                    label="Guardar"
                  />
                </div>
              </div>
            </div>
            {children}
          </div>
          <div className={styles.rightSide}>
            <div>
              <div className={styles.rightInputs}>
                <TextInput
                  control={control}
                  testId={'description'}
                  label="Descripcion"
                  name="description"
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
        <SuccessErrorMessage
          open={showAlert}
          error={projectError}
          resource={Resources.Proyectos}
          operation={operation}
        />
      </form>
      <Modal
        testId="editProjectModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea editar al proyecto ${selectedProject.projectName}?`}
          title={'Editar Proyecto'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </>
  );
};

export default ProjectForm;
