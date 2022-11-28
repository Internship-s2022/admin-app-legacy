import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import firebaseApp from 'src/helper/firebase';
import { RootState } from 'src/redux/store';
import { closeLogoutModal, openLogoutModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';

import { ConfirmationMessage, Modal } from '../../ui';
import HeaderLogo from '../../ui/icons/headerLogo';
import LogoutIcon from '../../ui/icons/logoutIcon';
import Navbar from '../navbar';
import styles from './header.module.css';

const Header = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const showLogoutModal = useSelector((state: RootState) => state.ui.showLogoutModal);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await firebaseApp.auth().signOut();
      dispatch(closeLogoutModal());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <HeaderLogo testId="headerLogo" />
          <span>Radium</span>
          <span>Admin</span>
        </div>
        <nav className={styles.navbarContainer}>
          <Navbar />
        </nav>
        <button
          data-testid="logout-btn"
          className={styles.logout}
          onClick={() => dispatch(openLogoutModal())}
        >
          Salir
          <div className={styles.iconContainer}>
            <LogoutIcon />
          </div>
        </button>
      </div>
      <Modal
        testId="confirmLogoutModal"
        styles={styles.modal}
        isOpen={showLogoutModal}
        onClose={() => dispatch(closeLogoutModal())}
      >
        <ConfirmationMessage
          title={'Cerrar sesión'}
          description={'¿Desea cerrar sesión de Radium Admin?'}
          handleConfirm={() => handleLogout()}
          handleClose={() => dispatch(closeLogoutModal())}
        />
      </Modal>
    </header>
  );
};

export default Header;
