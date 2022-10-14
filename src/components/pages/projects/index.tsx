import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { Headers } from 'src/components/shared/ui/table/types';
import { formattedProjectType } from 'src/constants';
import { getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './projects.module.css';
import { MappedProjectData, Member, ProjectData } from './types';

const Projects = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listProjects = useSelector((state: RootState) => state.project.projects);

  const membersArray: Member[] = [
    { firstName: 'Luciano Manuel', lastName: 'Alarcon' },
    { firstName: 'Juan Cruz', lastName: 'Moreira' },
    { firstName: 'Karen Agustina', lastName: 'Soto' },
  ];

  const mockedList = listProjects.map((project) => ({
    ...project,
    members: membersArray,
  }));

  const filteredProjects = mockedList.filter((project) => project.isActive);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const members = (list: ProjectData) => {
    let membersLength = '-';
    if (list.members.length > 1) {
      membersLength = `${capitalizeFirstLetter(list.members[0].firstName)} ${
        list.members[0].lastName
      } y ${list.members.length - 1} mas`;
    } else if (list.members.length == 1) {
      membersLength = `${capitalizeFirstLetter(list.members[0].firstName)} ${
        list.members[0].lastName
      }`;
    }
    return membersLength;
  };

  const listProjectsData = filteredProjects.map((project): MappedProjectData => {
    return {
      id: project?._id,
      projectName: `${capitalizeFirstLetter(project?.projectName)}`,
      clientName: `${capitalizeFirstLetter(project?.clientName)}`,
      projectType: project?.projectType && formattedProjectType[project.projectType],
      members: members(project),
    };
  });

  const header: Headers[] = [
    { header: 'Nombre del proyecto', key: 'projectName' },
    { header: 'Tipo de proyecto', key: 'projectType' },
    { header: 'Cliente', key: 'clientName' },
    { header: 'Involucrados', key: 'members' },
  ];

  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">¡Bienvenido!</Typography>
        <p>¡Esta es la lista de proyectos!</p>
      </div>

      <div className={styles.tableContainer}>
        <Table<MappedProjectData>
          showButtons={true}
          testId={'userTable'}
          headers={header}
          value={listProjectsData}
        />
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.TEXT}
            onClick={() => alert('Aca va el form')}
            label={'+ Agregar un nuevo proyecto'}
            testId={'addProjectButton'}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
