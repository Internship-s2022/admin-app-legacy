import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ProjectFormValues } from 'src/components/pages/projects/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';

import styles from './addNewProject.module.css';
import { criticalityOptions, projectTypeOptions } from './constants';

const AddNewProject = () => {
  const { handleSubmit, control, reset } = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      clientName: '',
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      projectType: null,
      criticality: null,
      description: '',
      notes: '',
      members: [
        {
          firstName: 'Samuel',
          lastName: 'Trillo',
        },
      ],
    },
    mode: 'onBlur',
    // resolver: joiResolver(editEmployeeValidations),
  });

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <form>
      <div className={styles.formContainer}>
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
                error
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
                error
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
                error
                fullWidth
              />
            </div>
            <div className={styles.elementContainer}>
              <Dropdown
                control={control}
                testId={'criticality'}
                label="Criticidad"
                name="criticality"
                options={criticalityOptions}
                error
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
                  error
                />
              </div>
              <div className={styles.dateSelection}>
                <DatePicker
                  label={'Fin'}
                  testId={'endDate'}
                  name="endDate"
                  control={control}
                  error
                />
              </div>
            </div>
            <div className={styles.saveButton}>
              <Button
                testId="saveButton"
                materialVariant={Variant.CONTAINED}
                onClick={() => handleNavigation('/projects')}
                label="Guardar"
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
                error
                fullWidth
                multiline
                maxRows={5}
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
                error
                fullWidth
                multiline
                maxRows={5}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewProject;
