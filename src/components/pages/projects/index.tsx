import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import {
  Button,
  ConfirmationMessage,
  Modal,
  SuccessErrorMessage,
  Table,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { UiRoutes } from 'src/constants';
import { deleteProject, getProjects } from 'src/redux/project/thunk';
import { RootState } from 'src/redux/store';
import { closeConfirmationModal, closeModal, openConfirmationModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter, formattedTableData } from 'src/utils/formatters';

import { formattedProjectType, projectFilterOptions, projectHeaders } from './constants';
import styles from './projects.module.css';
import { MappedProjectData, SearchProjectData } from './types';

const Projects = () => {
  const [row, setRow] = React.useState({} as any);

  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const dispatch: AppDispatch<null> = useDispatch();
  const projectList = useSelector((state: RootState) => state.project.list);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const formattedProjectList = useMemo(
    () =>
      projectList.map((project) => ({
        ...project,
        members: project.members?.map((member) => ({
          ...member,
          fullName: `${member?.employee?.user?.firstName} ${member?.employee?.user?.lastName}`,
        })),
      })),
    [projectList],
  );

  const activeProjectsList = useMemo(
    () =>
      formattedProjectList.reduce((acc, item) => {
        if (item.isActive) {
          acc.push({
            _id: item?._id,
            projectName: item?.projectName && `${capitalizeFirstLetter(item.projectName)}`,
            clientName: item?.clientName.name && `${capitalizeFirstLetter(item.clientName.name)}`,
            projectType: item?.projectType && formattedProjectType[item.projectType],
            startDate: item?.startDate?.toString(),
            endDate: item?.endDate?.toString(),
            criticality: item?.isCritic,
            description: item?.description,
            active: item?.isActive?.toString(),
            members: formattedTableData(item?.members, 'fullName'),
            notes: item?.notes,
          });
        }
        return acc;
      }, []),
    [projectList],
  );

  const projectError = useSelector((state: RootState) => state.project?.error);

  const [dataList, setDataList] = useState(activeProjectsList);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setDataList(activeProjectsList);
  }, [projectList]);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEdit = (row) => {
    handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}/${row._id}`);
  };

  const handleDataList = (data) => {
    setDataList(data);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(closeConfirmationModal());
    dispatch(closeModal());
  };

  const buttonsArray: TableButton<MappedProjectData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (row) => {
        return handleEdit(row);
      },
    },
    {
      active: true,
      label: 'X',
      testId: 'deleteButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        dispatch(openConfirmationModal());
        setRow(data);
      },
    },
  ];

  const showErrorMessage = projectError?.networkError || !activeProjectsList.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Proyectos}
      handleReload={() => handleNavigation(0)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}`)}
      error={projectError}
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Lista de proyectos</Typography>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.searchBar}>
          <SearchBar<SearchProjectData>
            setFilteredList={handleDataList}
            details={activeProjectsList}
            mainArray={projectFilterOptions}
          />
        </div>
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}`)}
            label={'+ Agregar proyecto'}
            testId={'addProjectButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {dataList.length ? (
          <Table<MappedProjectData>
            showButtons
            testId={'projectsTable'}
            headers={projectHeaders}
            value={dataList}
            setDataList={handleDataList}
            buttons={buttonsArray}
          />
        ) : (
          <>
            <div className={styles.notFound}>
              <div className={styles.notFoundTitle}>
                No han encontrado resultados que coincidan con tu búsqueda
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/searchNotFound.png`}
                  alt="Not found"
                ></img>
              </div>
            </div>
          </>
        )}
      </div>
      <SuccessErrorMessage
        open={showAlert}
        error={projectError}
        resource={Resources.Proyectos}
        operation={'borrado'}
      />
      <Modal
        testId="deleteModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          title={'Eliminar Proyecto'}
          description={`¿Desea eliminar al proyecto ${row.projectName}?`}
          handleConfirm={() => handleDelete(row._id)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default Projects;
