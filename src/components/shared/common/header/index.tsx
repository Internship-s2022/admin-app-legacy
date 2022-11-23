import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import firebaseApp from 'src/helper/firebase';
import { RootState } from 'src/redux/store';
import { closeConfirmationMsgModal, openConfirmationMsgModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import { ConfirmationMessage, Modal } from '../../ui';
import LogOutIcon from '../../ui/icons/logOutIcons';
import Navbar from '../navbar';
import styles from './header.module.css';

const Header = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await firebaseApp.auth().signOut();
      dispatch(closeConfirmationMsgModal());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span>Radium</span>
          <span>Admin</span>
        </div>
        <nav className={styles.navbarContainer}>
          <Navbar />
        </nav>
        <div data-testid="logout-btn" className={styles.logout}>
          <span>Salir</span>
          <LogOutIcon onClick={() => dispatch(openConfirmationMsgModal())} />
        </div>
        <Modal
          testId="confirmLogoutModal"
          styles={styles.modal}
          isOpen={showConfirmModal}
          onClose={() => dispatch(closeConfirmationMsgModal())}
        >
          <ConfirmationMessage
            title={'Cerrar sesión'}
            description={'¿Desea cerrar sesión de Radium Admin?'}
            handleConfirm={() => handleLogout()}
            handleClose={() => dispatch(closeConfirmationMsgModal())}
          />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
