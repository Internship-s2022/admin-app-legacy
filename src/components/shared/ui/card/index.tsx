import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';

import { Member } from 'src/redux/project/types';

import ClientCardIcon from '../icons/cardIcons/clientCardIcon';
import EmployeeCardIcon from '../icons/cardIcons/employeeCardIcon';
import ProjectCardIcon from '../icons/cardIcons/projectCardIcon';
import TickIcon from '../icons/cardIcons/tickIcon';
import styles from './card.module.css';
import { CardProps } from './types';

const defineIcon = (resourceType) => {
  switch (resourceType) {
    case 'Empleados':
      return { icon: <EmployeeCardIcon />, color: styles.employeeTabIcon };
    case 'Clientes':
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
  const { name, resource, members, notification, criticality, customMessage, isCustom } = props;
  const isProject = !!(resource === 'Proyectos');
  const isEmployee = !!(resource === 'Empleados');
  const cardIcon = defineIcon(resource);
  const criticalityColor = defineCriticality(criticality);
  const shownNotification = isCustom ? 'Notificación Personalizada' : notification;

  return (
    <div data-testid={'card-component'}>
      <div className={`${styles.baseIconTab} ${cardIcon.color}`}>{cardIcon.icon}</div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.title}>
            <div className={styles.nameContainer}>
              {isEmployee && <Avatar className={styles.avatars} />}
              <span>{name}</span>
            </div>
            <span>{resource.toUpperCase()}</span>
          </div>
          {isProject && (
            <div className={styles.projectInfo}>
              <>
                <div className={styles.membersContainer}>
                  <div className={styles.avatarsContainer}>
                    <AvatarGroup className={styles.avatars}>
                      {members?.map((member: Member) => {
                        return <Avatar key={member._id} />;
                      })}
                    </AvatarGroup>
                  </div>
                  <p>{members?.length} involucrados</p>
                </div>
                <div className={`${styles.criticality} ${criticalityColor}`}>
                  {criticality.toLowerCase()}
                </div>
              </>
            </div>
          )}
          {isCustom && <div className={styles.customMessage}>{customMessage}</div>}
        </div>
        <div className={styles.notification}>
          <p>{shownNotification}</p>
          <div className={styles.tickIcon}>
            <TickIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
