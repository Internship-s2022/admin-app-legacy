import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import CustomNotifications from 'src/components/shared/common/customNotificationForm';
import { Resource } from 'src/components/shared/common/customNotificationForm/types';
import { Button, Modal } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import BellIcon from 'src/components/shared/ui/icons/bellIcon';
import ClockIcon from 'src/components/shared/ui/icons/clockIcon';
import { UiRoutes } from 'src/constants';
import { getMembers } from 'src/redux/member/thunk';
import { RootState, useAppSelector } from 'src/redux/store';
import { closeFormModal, closeModal, openFormModal, openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import MemberForm from './memberForm';
import MemberTable from './memberTable';
import ProjectForm from './projectForm';
import styles from './projectMembersLayout.module.css';

const ProjectMembersLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dispatch: AppDispatch<null> = useDispatch();
  const showNotificationModal = useAppSelector((state: RootState) => state.ui.showFormModal);

  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const selectedProject = useSelector((state: RootState) => state.project.selectedProject);
  const membersList = useSelector((state: RootState) => state.member.list);
  const employeeList = useSelector((state: RootState) => state.employee.list);

  const [memberId, setMemberId] = React.useState({} as any);

  const matchedMember = membersList.find((member) => memberId === member._id);

  const helperArray = useMemo(() => {
    return matchedMember?.helper?.map((item, index) => {
      return (
        matchedMember.helper.length && {
          ...matchedMember.helper[index],
          helperReference: matchedMember.helper[index]?.helperReference?._id,
        }
      );
    });
  }, [membersList, memberId]);

  const selectedProjectMemberList = membersList.filter(
    (member) => member?.project?._id === selectedProject?._id,
  );

  const activeMembersList = selectedProjectMemberList.filter((member) => member.active);

  useEffect(() => {
    selectedProject?._id && dispatch(getMembers({ project: selectedProject?._id }));
  }, [selectedProject?._id]);

  const formattedMatchedMember = matchedMember && {
    ...matchedMember,
    employee: matchedMember.employee._id,
    helper: helperArray,
    project: matchedMember.project._id,
  };

  const handleAdd = () => {
    setMemberId('');
    dispatch(openModal());
  };

  const employeeDropdownList = () => {
    const activeEmployees = employeeList.filter((employee) => employee?.user?.isActive);
    return matchedMember
      ? activeEmployees
      : activeEmployees.reduce((acc, item) => {
          !activeMembersList.some((member) => member.employee._id === item._id) && acc.push(item);
          return acc;
        }, []);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <div> {id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</div>
        <div className={styles.iconGroup}>
          <div className={styles.iconContainer}>
            <ClockIcon />
          </div>
          <div className={styles.iconContainer} onClick={() => dispatch(openFormModal())}>
            <BellIcon />
          </div>
        </div>
      </div>
      <div>
        <ProjectForm>
          {activeMembersList?.length ? (
            <MemberTable list={activeMembersList} setMemberId={setMemberId} />
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
                  materialVariant={Variant.CONTAINED}
                  onClick={() => dispatch(openModal())}
                  label="+ Agregar Miembro"
                />
              </div>
            </div>
          )}
        </ProjectForm>
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
          testId={'project-custom-notification'}
          isOpen={showNotificationModal}
          onClose={() => dispatch(closeFormModal())}
        >
          <CustomNotifications resource={Resource.PROJECT} id={id} />
        </Modal>
      </div>
      <div>
        <Modal
          testId={'User-access-modal'}
          isOpen={!showNotificationModal && showModal}
          onClose={() => dispatch(closeModal())}
        >
          <MemberForm
            projectId={id}
            memberData={formattedMatchedMember}
            dropdownData={employeeDropdownList()}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProjectMembersLayout;