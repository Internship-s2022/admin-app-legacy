import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'src/components/shared/ui/card';
import { getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch, Resources } from 'src/types';

import { Criticality } from '../projects/types';
import styles from './home.module.css';

const Home = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const user = useSelector((state: RootState) => state.auth.authUser);
  const projects = useSelector((state: RootState) => state.project.list);
  const members = projects[0]?.members;

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <>
      <section className={styles.container}>
        {user.name.length ? <h2>Bienvenido {user.name}</h2> : ''}
      </section>
      <div className={styles.cardContainer}>
        <Card
          name={'Radium Admin'}
          resource={Resources.Proyectos}
          members={members}
          criticality={Criticality.BAJA}
          customMessage={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          isCustom
        />
        <Card
          name={'Luchito Alarcón'}
          resource={Resources.Empleados}
          notification={'notificación'}
        />
        <Card name={'Nombre Cliente'} resource={Resources.Clientes} notification={'notificación'} />
        <Card
          name={'Radium Admin'}
          resource={Resources.Proyectos}
          members={members}
          criticality={Criticality.MEDIA}
          customMessage={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          isCustom
        />
        <Card
          name={'Luchito Alarcón'}
          resource={Resources.Empleados}
          notification={'Notificación no custom'}
        />
        <Card name={'Nombre Cliente'} resource={Resources.Clientes} notification={'notificación'} />
        <Card
          name={'Radium Admin'}
          resource={Resources.Proyectos}
          members={members}
          criticality={Criticality.ALTA}
          customMessage={'Lorem ipsum dolor sit amet. Vestibulum sed.'}
          isCustom
        />
        <Card
          name={'Luchito Alarcón'}
          resource={Resources.Empleados}
          customMessage={'Consectetur adipiscing elit. Vestibulum sed.'}
          isCustom
        />
        <Card name={'Nombre Cliente'} resource={Resources.Clientes} notification={'notificación'} />
        <Card
          name={'Luchito Alarcón'}
          resource={Resources.Empleados}
          customMessage={'Lorem ipsum dolor sit amet.'}
          isCustom
        />
        <Card name={'Nombre Cliente'} resource={Resources.Clientes} notification={'notificación'} />
        <Card name={'Nombre Cliente'} resource={Resources.Clientes} notification={'notificación'} />
      </div>
    </>
  );
};

export default Home;
