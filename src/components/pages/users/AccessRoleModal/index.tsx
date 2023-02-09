import React from 'react';
import { useDispatch } from 'react-redux';

import styles from 'src/components/pages/users/AccessRoleModal/accessRoleModal.module.css';
import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { closeModal } from 'src/redux/ui/actions';
import { editUser } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { accessRoles } from '../constants';
import { AccessRoleModalProps } from './types';

const AccessRoleModal = (props: AccessRoleModalProps) => {
  const { row } = props;
  const [accessRole, setAccessRole] = React.useState(row.accessRoleType.toUpperCase());
  const dispatch: AppDispatch<null> = useDispatch();

  const options = {
    id: row._id,
    body: {
      accessRoleType: accessRole,
    },
  };
  const onSubmit = (data) => {
    dispatch(editUser(data));
    dispatch(closeModal());
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Editar acceso</h1>
      </div>
      <div className={styles.modalContainer}>
        {accessRoles.map((item) => {
          if (item.value != 'SUPER_ADMIN') {
            return (
              <Button
                key={item.value}
                testId={`access${item.label}Btn`}
                materialVariant={accessRole === item.value ? Variant.CONTAINED : Variant.OUTLINED}
                label={item.label}
                onClick={() => setAccessRole(item.value)}
                styles={accessRole === item.value ? styles.selectedBtn : styles.unselectedBtn}
              ></Button>
            );
          }
        })}
      </div>
      <div className={styles.confirmBtns}>
        <Button
          testId={'cancelAccessRoleBtn'}
          materialVariant={Variant.OUTLINED}
          label={'Cancelar'}
          onClick={() => dispatch(closeModal())}
        ></Button>
        <Button
          testId={'confirmAccessRoleBtn'}
          materialVariant={Variant.CONTAINED}
          label={'Confirmar'}
          onClick={() => onSubmit(options)}
        ></Button>
      </div>
    </div>
  );
};

export default AccessRoleModal;
