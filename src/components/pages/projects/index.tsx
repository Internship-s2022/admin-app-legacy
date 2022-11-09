import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler/emptyDataHandler';
import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
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
  const listProjects = useSelector((state: RootState) => state.project.list);
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

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

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

  const showErrorMessage = projectError || !listProjectsData.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource="Proyectos"
      handleAdd={() => handleNavigation('/admin/projects/add')}
      handleReload={() => handleNavigation('/admin/projects')}
      error={projectError}
    />
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
          onClick={() => handleNavigation('/admin/projects/add')}
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
