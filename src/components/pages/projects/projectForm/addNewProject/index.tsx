import React, { useEffect } from 'react';
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
  TextInput,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SuccessErrorMessage from 'src/components/shared/ui/successErrorMessage';
import { getClients } from 'src/redux/client/thunks';
import { cleanSelectedProject } from 'src/redux/project/actions';
import { createProject, editProject, getProjectById } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import {
  closeConfirmationMsgModal,
  openConfirmationMsgModal,
  openModal,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';

import MemberTable from '../memberTable';
import styles from './addNewProject.module.css';
import { criticalityOptions, projectTypeOptions } from './constants';
import { projectValidation } from './validations';

const AddNewProject = () => {
  const { id } = useParams();
  const [openSuccessErrorMsg, setSuccessErrorMsgOpen] = React.useState(false);
  const dispatch: AppDispatch<null> = useDispatch();
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);

  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const membersList = useSelector((state: RootState) => state.member.list);

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

  const { control, reset, handleSubmit } = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      clientName: '',
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
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
        endDate: data.endDate,
        projectType: data.projectType,
        isCritic: data.isCritic,
        description: data.description,
        notes: data.notes,
      }),
    };
    id ? dispatch(editProject(options)) : dispatch(createProject(options));
    setSuccessErrorMsgOpen(true);
    dispatch(closeConfirmationMsgModal());
  };

  useEffect(() => {
    dispatch(getClients());
    id && dispatch(getProjectById(id));
    return () => {
      dispatch(cleanSelectedProject());
    };
  }, [membersList]);

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
                  </div>
                  <div className={styles.dateSelection}>
                    <DatePicker label={'Fin'} testId={'endDate'} name="endDate" control={control} />
                  </div>
                </div>
                <div className={styles.saveButton}>
                  <Button
                    testId="saveButton"
                    materialVariant={Variant.CONTAINED}
                    onClick={
                      id ? () => dispatch(openConfirmationMsgModal()) : handleSubmit(onSubmit)
                    }
                    label="Guardar"
                  />
                </div>
              </div>
            </div>
            {selectedProject?.members?.length ? (
              <MemberTable list={selectedProject?.members} />
            ) : (
              <div className={styles.emptyMember}>
                <div>Este proyecto no cuenta con miembros asociados</div>
                <div className={styles.messageContainer}>
                  <p>Para agregar un nuevo miembro al proyecto,</p>
                  <p>clickee en agregar miembro</p>
                </div>
                <div className={styles.addMemberButton}>
                  <Button
                    testId="addMember"
                    materialVariant={Variant.OUTLINED}
                    onClick={() => dispatch(openModal())}
                    label="+ Agregar Miembro"
                  />
                </div>
              </div>
            )}
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
          open={openSuccessErrorMsg}
          setOpen={setSuccessErrorMsgOpen}
          error={projectError}
          resource={Resources.Proyectos}
          operation={operation}
        />
      </form>
      <Modal
        testId="editProjectModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationMsgModal())}
      >
        <ConfirmationMessage
          description={`¿Desea editar al proyecto ${selectedProject.projectName}?`}
          title={'Editar Proyecto'}
          handleConfirm={handleSubmit(onSubmit)}
          handleClose={() => dispatch(closeConfirmationMsgModal())}
        />
      </Modal>
    </>
  );
};

export default AddNewProject;
