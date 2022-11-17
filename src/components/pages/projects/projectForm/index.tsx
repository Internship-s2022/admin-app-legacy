import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import ClockIcon from 'src/components/shared/ui/icons/clockIcon';
import { UiRoutes } from 'src/constants';
import { cleanSelectedProject } from 'src/redux/project/actions';
import { getProjectById } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { closeModal, openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import AddMemberForm from './addMember';
import AddNewProject from './addNewProject';
import styles from './projectForm.module.css';

const ProjectForm = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dispatch: AppDispatch<null> = useDispatch();
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const projectList = useSelector((state: RootState) => state.project.list);

  const { id } = useParams();

  useEffect(() => {
    id && dispatch(getProjectById(id));
    return () => {
      dispatch(cleanSelectedProject());
    };
  }, []);

  const selectedProject = projectList?.find((project) => project._id === id);

  console.log(selectedProject);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div> {id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</div>
        <div className={styles.iconGroup}>
          <div className={styles.iconContainer}>
            <ClockIcon />
          </div>
          <div className={styles.iconContainer}>
            <BellIcon />
          </div>
        </div>
      </div>
      <div>
        <AddNewProject />
      </div>
      <div className={styles.buttonContainer}>
        <div>
          <Button
            testId="cancelButton"
            materialVariant={Variant.OUTLINED}
            onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS}`)}
            label="Cancelar"
          />
        </div>
        <div>
          <Button
            testId="confirmButton"
            materialVariant={Variant.CONTAINED}
            onClick={() => undefined}
            label="Confirmar"
          />
        </div>
      </div>
      {selectedProject?.members.length ? (
        <div>ACA VA LA TABLA LUCHORONGA</div>
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
      <div>
        <Modal
          testId={'User-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AddMemberForm />
        </Modal>
      </div>
    </div>
  );
};

export default ProjectForm;
