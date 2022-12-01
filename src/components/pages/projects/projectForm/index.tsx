import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import ClockIcon from 'src/components/shared/ui/icons/clockIcon';
import { UiRoutes } from 'src/constants';
import { getMembers } from 'src/redux/member/thunk';
import { RootState } from 'src/redux/store';
import { closeModal, openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import AddMemberForm from './addMember';
import AddNewProject from './addNewProject';
import MemberTable from './memberTable';
import styles from './projectForm.module.css';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dispatch: AppDispatch<null> = useDispatch();
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const membersList = useSelector((state: RootState) => state.member.list);

  const [memberId, setMemberId] = React.useState({} as any);

  const matchedMember = membersList.find((member) => memberId === member._id);

  useEffect(() => {
    dispatch(getMembers()); //TODO: HACER FILTRADO
  }, [matchedMember?.helper.helperReference]); //TODO: Agregar algo para que no entre en loop

  const selectedProjectMemberList = membersList.filter(
    (member) => member?.project?._id === selectedProject?._id,
  );

  const formattedMatchedMember = matchedMember && {
    ...matchedMember,
    employee: matchedMember.employee._id,
    helper: matchedMember.helper[0]
      ? {
          ...matchedMember.helper[0],
          helperReference: matchedMember.helper[0].helperReference._id,
        }
      : '',
    project: matchedMember.project._id,
  };

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
        <AddNewProject>
          {selectedProject?.members?.length ? (
            <MemberTable list={selectedProjectMemberList} setMemberId={setMemberId} />
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
        </AddNewProject>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          testId="cancelButton"
          materialVariant={Variant.OUTLINED}
          onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS}`)}
          label="Volver"
        />
      </div>
      <div>
        <Modal
          testId={'User-access-modal'}
          isOpen={showModal}
          onClose={() => dispatch(closeModal())}
        >
          <AddMemberForm projectId={id} memberData={formattedMatchedMember} />
        </Modal>
      </div>
    </div>
  );
};

export default ProjectForm;
