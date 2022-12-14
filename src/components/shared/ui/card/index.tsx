import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';

import { Member } from 'src/components/pages/home/types';
import { UiRoutes } from 'src/constants';

import ClientCardIcon from '../icons/cardIcons/clientCardIcon';
import EmployeeCardIcon from '../icons/cardIcons/employeeCardIcon';
import ProjectCardIcon from '../icons/cardIcons/projectCardIcon';
import TickIcon from '../icons/cardIcons/tickIcon';
import TickIconColor from '../icons/cardIcons/tickIconColor';
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
  const { name, resource, members, notification, criticality, customMessage, isCustom, id } = props;
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

  return (
    <div data-testid={'card-component'} onClick={() => redirectClick(id)}>
      <div className={`${styles.baseIconTab} ${cardIcon.color}`}>{cardIcon.icon}</div>
      <div className={`${styles.cardContainer} ${styles.card}`}>
        <div className={styles.cardContent}>
          <div className={styles.title}>
            <div className={styles.nameContainer}>
              {isEmployee && <Avatar className={styles.avatars} />}
              <span key={id}>{name}</span>
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
          {checked ? (
            <div className={styles.tickIcon} onClick={() => setChecked(!checked)}>
              <TickIconColor />
            </div>
          ) : (
            <div className={styles.tickIcon} onClick={() => setChecked(!checked)}>
              <TickIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
