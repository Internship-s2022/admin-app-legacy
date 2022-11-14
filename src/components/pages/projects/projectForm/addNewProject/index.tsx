import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Criticality, ProjectFormValues, ProjectType } from 'src/components/pages/projects/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { UiRoutes } from 'src/constants';
import { cleanSelectedProject } from 'src/redux/project/actions';
import { createProject, editProject, getProjectById } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import styles from './addNewProject.module.css';
import { criticalityOptions, projectTypeOptions } from './constants';
import { projectValidation } from './validations';

const AddNewProject = () => {
  const { id } = useParams();
  const dispatch: AppDispatch<null> = useDispatch();
  const selectedProject = useSelector((state: RootState) => state.project?.selectedProject);

  const { control, reset, handleSubmit } = useForm<ProjectFormValues>(
    {
      defaultValues: {
        projectName: '',
        clientName: '',
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        projectType: ProjectType.STAFF_AUMENTATION,
        isCritic: Criticality.HIGH,
        description: '',
        notes: '',
      },
      mode: 'onBlur',
      resolver: joiResolver(projectValidation),
    },
    [selectedProject],
  );

  const onSubmit = (data) => {
    const options = {
      id: id,
      body: JSON.stringify({
        projectName: data.projectName,
        clientName: data.clientName.id,
        startDate: data.startDate,
        endDate: data.endDate,
        projectType: data.projectType,
        isCritic: data.isCritic,
        description: data.description,
        notes: data.notes,
      }),
    };

    id ? dispatch(editProject(options)) : dispatch(createProject(options));
    // dispatch(cleanSelectedProject());
  };

  useEffect(() => {
    console.log('inside firs use effect', id);
    dispatch(getProjectById(id));
    return () => {
      dispatch(cleanSelectedProject());
    };
  }, []);

  useEffect(() => {
    reset({
      projectName: selectedProject.projectName,
      clientName: selectedProject.clientName?.name,
      startDate: selectedProject.startDate,
      endDate: selectedProject.endDate,
      projectType: selectedProject.projectType as ProjectType,
      isCritic: selectedProject.isCritic as Criticality,
      description: selectedProject.description,
      notes: selectedProject.notes,
    });
  }, [selectedProject]);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
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
                <TextInput
                  control={control}
                  testId={'clientName'}
                  label="Cliente"
                  name="clientName"
                  type={'text'}
                  variant="outlined"
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
                  onClick={handleSubmit(onSubmit)}
                  label="Guardar"
                />
              </div>
            </div>
          </div>
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
    </form>
  );
};

export default AddNewProject;
