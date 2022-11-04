import React from 'react';

import styles from './memberForm.module.css';

const AddMemberForm = () => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.headerAddMember} data-testid={'headerMessage'}>
        Agregar miembro al proyecto
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.memberForm}>TO DO Formulario</div>
        <div className={styles.memberForm}>TO DO Calendario</div>
      </div>
    </div>
  );
};

export default AddMemberForm;
