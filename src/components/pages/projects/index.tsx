import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { UiRoutes } from 'src/constants';
import { getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter, formattedTableData } from 'src/utils/formatters';

import { formattedProjectType, projectFilterData, projectHeaders } from './constants';
import styles from './projects.module.css';
import { MappedProjectData, SearchProjectData } from './types';

const Projects = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listProjects = useSelector((state: RootState) =>
    state.project.list.map((project) => {
      return {
        _id: project?._id,
        projectName: `${capitalizeFirstLetter(project.projectName)}`,
        clientName: `${capitalizeFirstLetter(project.clientName.name)}`,
        projectType: project?.projectType && formattedProjectType[project.projectType],
        startDate: project?.startDate.toString(),
        endDate: project?.endDate.toString(),
        criticality: project?.isCritic,
        description: project?.description,
        active: project?.isActive.toString(),
        members: formattedTableData(project?.members, 'fullName'),
        notes: project?.notes,
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

  const showErrorMessage = projectError?.networkError || !listProjects.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Proyectos}
      handleReload={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.ADD_CLIENTS}`)}
      error={projectError}
    />
  ) : (
    <div className={styles.container}>
      <h1>Lista de proyectos</h1>
      <div className={styles.topTableContainer}>
        <div className={styles.searchBar}>
          <SearchBar<SearchProjectData>
            setFilteredList={setFilteredList}
            details={listProjects}
            mainArray={projectFilterData}
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
            showButtons
            testId={'projectsTable'}
            headers={projectHeaders}
            value={filteredList}
            buttons={buttonsArray}
          />
        </div>
      ) : (
        <>
          <div className={styles.notFound}>
            <div className={styles.notFoundTitle}>
              No han encontrado resultados que coincidan con tu búsqueda
            </div>
            <div>
              <img src={`${process.env.PUBLIC_URL}/assets/images/rafiki.png`} alt="Not found"></img>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
