import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { AccessRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';

import styles from './notallowed.module.css';

const NotAllowed = () => {
  const roleFromStore = useSelector((state: RootState) => state.auth.authUser.accessRoleType);

  const navigate = useNavigate();
  return (
    <section className={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/assets/images/notAllowed.png`} alt="Not found"></img>
      <h2>Acceso denegado</h2>
      <p>Usted no posee los permisos necesarios para ingresar</p>
      <p>Por favor contactarse con el equipo de soporte</p>
      {roleFromStore !== AccessRoleType.ADMIN && roleFromStore !== AccessRoleType.SUPER_ADMIN && (
        <div className={styles.returnButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => {
              navigate('/login');
            }}
            label={'Volver'}
            testId={'return-button'}
          />
        </div>
      )}
    </section>
  );
};

export default NotAllowed;
