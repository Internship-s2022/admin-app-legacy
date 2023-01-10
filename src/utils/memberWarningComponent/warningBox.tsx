import React from 'react';

import styles from 'src/components/pages/projects/projectMembersLayout/memberForm/memberForm.module.css';
import WarningIcon from 'src/components/shared/ui/icons/warning';

//Esta función sirve para mostrar el warning dentro del formulario de member
export const warningBox = (list, watchEmployeeId, watchHelperId) => {
  const employeeSelected = list.find((item) => item?._id === watchEmployeeId);
  const helperSelected = list.find((item) => item?._id === watchHelperId);
  let warningMessage = '';

  if (
    (!employeeSelected && !helperSelected) ||
    (employeeSelected && employeeSelected.availability && !helperSelected) ||
    (helperSelected && helperSelected.availability && !employeeSelected)
  ) {
    warningMessage = '';
  } else if (helperSelected && !helperSelected.availability && !employeeSelected) {
    warningMessage = 'El ayudante seleccionado no se encuentra disponible';
  } else if (employeeSelected && !employeeSelected.availability && !helperSelected) {
    warningMessage = 'El empleado seleccionado no se encuentra disponible';
  } else if (employeeSelected && helperSelected) {
    if (employeeSelected?.availability && helperSelected?.availability) {
      warningMessage = '';
    } else if (!helperSelected?.availability) {
      warningMessage = employeeSelected?.availability
        ? 'El ayudante seleccionado no se encuentra disponible'
        : 'Los empleados seleccionados no se encuentran disponible';
    } else {
      warningMessage = 'El empleado seleccionado no se encuentra disponible';
    }
  }

  return (
    <div className={styles.warningContainer}>
      <div className={styles.warningMessage}>
        {warningMessage && <WarningIcon />}
        <div className={styles.warningText}>{warningMessage}</div>
      </div>
    </div>
  );
};
