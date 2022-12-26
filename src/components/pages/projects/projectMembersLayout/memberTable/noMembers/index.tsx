import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import styles from './noMembers.module.css';
import { NoMembersProps } from './types';

const NoMembers = (props: NoMembersProps) => {
  const { projectId } = props;
  const dispatch: AppDispatch<null> = useDispatch();

  return projectId ? (
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
  ) : (
    <div className={styles.emptyMember}>
      <div>Este proyecto no cuenta con miembros asociados</div>
      <div className={styles.messageContainer}>
        <p>Para agregar un nuevo miembro al proyecto,</p>
        <p>primero guarde los datos del proyecto</p>
      </div>
      <div className={styles.addMemberButton}>
        <Button
          testId="addMember"
          materialVariant={Variant.CONTAINED}
          onClick={() => dispatch(openModal())}
          label="+ Agregar Miembro"
          disabled
        />
      </div>
    </div>
  );
};

export default NoMembers;
