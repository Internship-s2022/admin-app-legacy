import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Criticality, ProjectFormValues, ProjectType } from 'src/components/pages/projects/types';
import { Button, DatePicker, Dropdown, TextInput } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { UiRoutes } from 'src/constants';
import { openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import styles from './addNewProject.module.css';
import { criticalityOptions, projectTypeOptions } from './constants';

const AddNewProject = () => {
  const { control } = useForm<ProjectFormValues>({
    defaultValues: {
      projectName: '',
      clientName: '',
      startDate: Date.now().toString(),
      endDate: Date.now().toString(),
      projectType: ProjectType.StaffAugmentation,
      criticality: Criticality.Baja,
      description: '',
      notes: '',
      members: [],
    },
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const dispatch: AppDispatch<null> = useDispatch();

  return (
    <form>
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
                  name="criticality"
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
                  onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS}`)}
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
