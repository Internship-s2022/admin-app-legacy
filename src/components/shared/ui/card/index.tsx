import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material';

import ClientCardIcon from '../icons/cardIcons/clientCardIcon';
import EmployeeCardIcon from '../icons/cardIcons/employeeCardIcon';
import ProjectCardIcon from '../icons/cardIcons/projectCardIcon';
import TickIcon from '../icons/cardIcons/tickIcon';
import styles from './card.module.css';

const defineIcon = (data) => {
  switch (data) {
    case 'Empleados':
      return { icon: <EmployeeCardIcon />, color: styles.employeeTabIcon };
    case 'Clientes':
      return { icon: <ClientCardIcon />, color: styles.clientTabIcon };
    default:
      return { icon: <ProjectCardIcon />, color: styles.projectTabIcon };
  }
};

const defineCriticality = (data) => {
  switch (data) {
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

const Card = (props: any) => {
  const { name, resource, members, notification, criticality, customMessage, isCustom } = props;
  const isProject = !!(resource === 'Proyectos');
  const isEmployee = !!(resource === 'Empleados');
  const cardIcon = defineIcon(resource);
  const criticalityColor = defineCriticality(criticality);
  const shownNotification = isCustom ? 'Notificación Personalizada' : notification;

  return (
    <div className={styles.container}>
      <div className={`${styles.baseIconTab} ${cardIcon.color}`}>{cardIcon.icon}</div>
      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.title}>
            <div className={styles.nameContainer}>
              {isEmployee && <Avatar className={styles.avatars} />}
              <span>{name}</span>
            </div>
            <span>{resource}</span>
          </div>
          {isProject && (
            <div className={styles.projectInfo}>
              <>
                <div>
                  <div>
                    <AvatarGroup className={styles.avatars}>
                      {members?.map((member: any) => {
                        return <Avatar key={member._id} />;
                      })}
                    </AvatarGroup>
                  </div>
                  <span>{members?.length} involucrados</span>
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
