import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup, Grow } from '@mui/material';

import { Member } from 'src/components/pages/home/types';
import { UiRoutes } from 'src/constants';
import { deleteNotification } from 'src/redux/notifications/thunk';
import { AppDispatch } from 'src/types';

import ClientCardIcon from '../icons/cardIcons/clientCardIcon';
import EmployeeCardIcon from '../icons/cardIcons/employeeCardIcon';
import ProjectCardIcon from '../icons/cardIcons/projectCardIcon';
import TickIcon from '../icons/cardIcons/tickIcon';
import styles from './card.module.css';
import { CardProps } from './types';

const defineIcon = (resourceType) => {
  switch (resourceType) {
    case 'EMPLOYEE':
      return { icon: <EmployeeCardIcon />, color: styles.employeeTabIcon };
    case 'CLIENT':
      return { icon: <ClientCardIcon />, color: styles.clientTabIcon };
    default:
      return { icon: <ProjectCardIcon />, color: styles.projectTabIcon };
  }
};

const defineCriticality = (criticality) => {
  switch (criticality) {
    case 'MEDIA':
      return styles.mediumCriticality;
    case 'ALTA':
      return styles.highCriticality;
    case 'BAJA':
      return styles.lowCriticality;
    default:
      return '';
  }
};

const Card = (props: CardProps) => {
  const dispatch: AppDispatch<null> = useDispatch();

  const {
    name,
    resource,
    members,
    notification,
    criticality,
    customMessage,
    isCustom,
    entityId,
    id,
  } = props;
  const isProject = !!(resource === 'PROJECT');
  const isEmployee = !!(resource === 'EMPLOYEE');
  const cardIcon = defineIcon(resource);
  const criticalityColor = defineCriticality(criticality);
  const shownNotification = isCustom ? 'Notificación Personalizada' : notification;
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false);

  const redirectClick = (data) => {
    if (isProject) {
      navigate(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}/${data}`);
    } else if (isEmployee) {
      navigate(`${UiRoutes.ADMIN}${UiRoutes.EDIT_EMPLOYEES}/${data}`);
    } else {
      navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}/${data}`);
    }
  };

  const onClick = (id) => {
    setChecked(!checked);
    setTimeout(() => {
      dispatch(deleteNotification(id));
    }, 250);
  };

  return (
    <Grow
      in={!checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(!checked ? { timeout: 1000 } : {})}
    >
      <div data-testid={'card-component'}>
        <div className={`${styles.baseIconTab} ${cardIcon.color}`}>{cardIcon.icon}</div>
        <div className={`${styles.cardContainer} ${styles.card}`}>
          <div className={styles.cardContent} onClick={() => redirectClick(entityId)}>
            <div className={styles.title}>
              <div className={styles.nameContainer}>
                {isEmployee && <Avatar className={styles.avatars} />}
                <span key={entityId}>{name}</span>
              </div>
              <span>{resource?.toUpperCase()}</span>
            </div>
            {isProject && (
              <div className={styles.projectInfo}>
                <>
                  <div className={styles.membersContainer}>
                    <div className={styles.avatarsContainer}>
                      <AvatarGroup className={styles.avatars}>
                        {members.map((member: Member) => {
                          return <Avatar key={member._id} />;
                        })}
                      </AvatarGroup>
                    </div>
                    {!!members?.length && <p>{members?.length} involucrados</p>}
                  </div>
                  <div className={`${styles.criticality} ${criticalityColor}`}>
                    {criticality?.toUpperCase()}
                  </div>
                </>
              </div>
            )}
            {isCustom && <div className={styles.customMessage}>{customMessage}</div>}
          </div>
          <div className={styles.notification}>
            <p>{shownNotification}</p>
            <div className={styles.tickIcon} onClick={() => onClick(id)}>
              <TickIcon checked={checked} />
            </div>
          </div>
        </div>
      </div>
    </Grow>
  );
};

export default Card;
