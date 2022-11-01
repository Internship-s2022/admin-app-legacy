import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon/bellIcon';
import ClockIcon from 'src/components/shared/ui/icons/clockIcon/clockIcon';
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

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div>Nuevo Proyecto</div>
        <div className={styles.iconGroup}>
          <div className={styles.iconContainer}>
            <ClockIcon></ClockIcon>
          </div>
          <div className={styles.iconContainer}>
            <BellIcon></BellIcon>
          </div>
        </div>
      </div>
      <div>
        <AddNewProject />
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
      <div className={styles.buttonContainer}>
        <div>
          <Button
            testId="cancelButton"
            materialVariant={Variant.OUTLINED}
            onClick={() => handleNavigation('/projects')}
            label="Cancelar"
          />
        </div>
        <div>
          <Button
            testId="confirmButton"
            materialVariant={Variant.CONTAINED}
            onClick={() => console.log('TODO')}
            label="Confirmar"
          />
        </div>
      </div>
      <div>
        <Modal
          testId={'User-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AddMemberForm />
          {/* <div className={styles.modalContainer}>
            <div className={styles.headerAddMember}>Agregar miembro al proyecto</div>
            <div className={styles.contentContainer}>
              <div className={styles.memberForm}>TO DO Formulario</div>
              <div className={styles.memberForm}>TO DO Calendario</div>
            </div>
          </div> */}
        </Modal>
      </div>
    </div>
  );
};

export default ProjectForm;
