import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter, formattedTableData } from 'src/utils/formatters';

import { formattedProjectType, membersArray, projectArray, projectHeaders } from './constants';
import styles from './projects.module.css';
import { MappedProjectData, ProjectData } from './types';

const Projects = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listProjects = useSelector((state: RootState) =>
    state.project.list.map((project) => {
      return {
        id: project?._id,
        projectName: `${capitalizeFirstLetter(project.projectName)}`,
        clientName: `${capitalizeFirstLetter(project.clientName.name)}`,
        projectType: project?.projectType && formattedProjectType[project.projectType],
        startDate: project?.startDate.toString(),
        endDate: project?.endDate.toString(),
        criticality: project?.isCritic,
        description: project?.description,
        active: project?.isActive.toString(),
        members: formattedTableData(project?.members, 'fullName'),
      };
    }),
  );
  const projectError = useSelector((state: RootState) => state.project?.error);

  const [filteredList, setFilteredList] = useState(listProjects);

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
        <div className={styles.searchBar}>
          <SearchBar
            setFilteredList={setFilteredList}
            details={listProjects}
            mainArray={projectArray}
          />
        </div>
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => handleNavigation('/admin/projects/add')}
            label={'+ Agregar proyecto'}
            testId={'addProjectButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      {filteredList.length ? (
        <div className={styles.tableContainer}>
          <Table<MappedProjectData>
            showButtons={true}
            testId={'projectsTable'}
            headers={projectHeaders}
            value={filteredList}
            buttons={buttonsArray}
          />
        </div>
      ) : (
        <>
          <div>No encontró nada</div>
        </>
      )}
    </div>
  );
};

export default Projects;
