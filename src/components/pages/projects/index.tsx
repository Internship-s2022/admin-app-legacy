import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { capitalizeFirstLetter, formattedTableData } from 'src/utils/formatters';

import { formattedProjectType, membersArray, projectHeaders } from './constants';
import styles from './projects.module.css';
import { MappedProjectData } from './types';

const Projects = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listProjects = useSelector((state: RootState) => state.project.projects);
  const projectError = useSelector((state: RootState) => state.project?.error);

  const formattedMember = membersArray.map((member) => {
    const fullNameMember = `${capitalizeFirstLetter(member.firstName)} ${capitalizeFirstLetter(
      member.lastName,
    )}`;
    return {
      fullName: fullNameMember,
    };
  });

  const mockedList = listProjects.map((project) => ({
    ...project,
    members: formattedMember,
  }));

  const filteredProjects = mockedList.filter((project) => project.isActive);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const buttonsArray: TableButton<MappedProjectData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: () => undefined,
    },
  ];

  const listProjectsData = filteredProjects.map((project): MappedProjectData => {
    return {
      id: project?._id,
      projectName: `${capitalizeFirstLetter(project.projectName)}`,
      clientName: `${capitalizeFirstLetter(project.clientName.name)}`,
      projectType: project?.projectType && formattedProjectType[project.projectType],
      members: formattedTableData(project.members, 'fullName'),
    };
  });

  return !listProjects.length ? (
    <div className={styles.noList}>
      <div className={styles.noListTitle}>
        <span>Lista de empleados</span>
        <div className={styles.noListMessage}>
          <p>No se ha podido cargar la lista de Empleados</p>
          <p className={styles.error}>Error: {projectError}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <h1>Lista de proyectos</h1>
      <div className={styles.topTableContainer}>
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input className={styles.searchInput} placeholder="Búsqueda por palabra clave" />
        </div>
        <Button
          materialVariant={Variant.CONTAINED}
          onClick={() => undefined}
          label={'+ Agregar proyecto'}
          testId={'addProjectButton'}
          styles={'addButton'}
        />
      </div>
      <div className={styles.tableContainer}>
        <Table<MappedProjectData>
          showButtons={true}
          testId={'projectsTable'}
          headers={projectHeaders}
          value={listProjectsData}
          buttons={buttonsArray}
        />
      </div>
    </div>
  );
};

export default Projects;
