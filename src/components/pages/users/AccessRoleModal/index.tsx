import React from 'react';
import { useDispatch } from 'react-redux';

import styles from 'src/components/pages/users/AccessRoleModal/accessRoleModal.module.css';
import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { editUser } from 'src/redux/user/thunks';
import { AppDispatch } from 'src/types';

import { accessRoles } from '../index';
import { AccessRoleModalProps } from './types';

const AccessRoleModal = (props: AccessRoleModalProps) => {
  const { row, setOpen } = props;
  const [accessRole, setAccessRole] = React.useState(row.accessRoleType.toUpperCase());
  const dispatch: AppDispatch<null> = useDispatch();

  const options = {
    id: row.id,
    body: {
      accessRoleType: accessRole,
    },
  };

  const onSubmit = (data) => {
    dispatch(editUser(data));
    setOpen(false);
  };
  return (
    <div>
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
                styles={styles.buttonStyle}
              ></Button>
            );
          }
        })}
      </div>
      <div className={styles.confirmBtns}>
        <Button
          testId={'confirmAccessRoleBtn'}
          materialVariant={Variant.CONTAINED}
          label={'Confirmar'}
          onClick={() => onSubmit(options)}
        ></Button>
        <Button
          testId={'confirmAccessRoleBtn'}
          materialVariant={Variant.OUTLINED}
          label={'Cancelar'}
          onClick={() => setOpen(false)}
        ></Button>
      </div>
    </div>
  );
};

export default AccessRoleModal;
