import React, { useEffect, useMemo, useState } from 'react';
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
import DeleteIcon from 'src/components/shared/ui/icons/tableIcons/deleteIcon';
import EditIcon from 'src/components/shared/ui/icons/tableIcons/editIcon';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { UiRoutes } from 'src/constants';
import { cleanSelectedProject } from 'src/redux/project/actions';
import { deleteProject, editProject, getProjects } from 'src/redux/project/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeMessageAlert,
  openConfirmationModal,
  setSnackbarOperation,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { capitalizeFirstLetter, formattedTableData } from 'src/utils/formatters';

import {
  formattedProjectType,
  optionsIsCritic,
  projectFilterOptions,
  projectHeaders,
} from './constants';
import styles from './projects.module.css';
import { MappedProjectData, SearchProjectData } from './types';

const filterData = (list, filters) => {
  let filterDataList;

  filterDataList = list.filter((item) => item.active === filters.isActive);

  filterDataList = filterDataList.filter((item) => item.criticality.includes(filters.criticality));

  if (filters.search) {
    filterDataList = filterDataList?.filter((d) =>
      projectFilterOptions.some((field) =>
        d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
      ),
    );
  }

  return filterDataList;
};

const Projects = () => {
  const [row, setRow] = React.useState({} as any);

  const dispatch: AppDispatch<null> = useAppDispatch();
  const projectError = useAppSelector((state: RootState) => state.project?.error);
  const showConfirmModal = useAppSelector((state: RootState) => state.ui.showConfirmModal);
  const projectList = useAppSelector((state: RootState) => state.project.list);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);

  const [dataList, setDataList] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [filters, setFilters] = React.useState({
    isActive: true,
    criticality: '',
    search: '',
  });
  const confirmationTitle = filters.isActive ? 'Desactivar proyecto' : 'Activar proyecto';
  const confirmationDescription = filters.isActive
    ? `¿Desea desactivar al proyecto ${row.projectName}?`
    : `¿Desea activar al proyecto ${row.projectName}?`;

  const activeProjectsList = useMemo(() => {
    const formattedProjectList = projectList.map((project) => ({
      ...project,
      members: project?.members?.map((member) => ({
        ...member,
        fullName: `${member?.employee?.user?.firstName} ${member?.employee?.user?.lastName}`,
      })),
    }));
    const mappedProjects = formattedProjectList.reduce((acc, item) => {
      acc.push({
        _id: item?._id,
        projectName: item?.projectName && `${capitalizeFirstLetter(item.projectName)}`,
        clientName: item?.clientName.name && `${capitalizeFirstLetter(item.clientName.name)}`,
        projectType: item?.projectType && formattedProjectType[item.projectType],
        startDate: item?.startDate?.toString(),
        endDate: item?.endDate?.toString(),
        criticality: item?.isCritic,
        description: item?.description,
        active: item?.isActive,
        members: formattedTableData(item?.members, 'fullName'),
        notes: item?.notes,
      });
      return acc;
    }, []);
    const filteredData = filterData(mappedProjects, filters);
    return filteredData;
  }, [projectList, filters.isActive, filters.criticality, filters.search]);

  useEffect(() => {
    dispatch(getProjects());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(cleanSelectedProject());
  }, []);

  useEffect(() => {
    setDataList(activeProjectsList);
  }, [projectList, filters.isActive, filters.criticality, filters.search]);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEdit = (row) => {
    dispatch(setSnackbarOperation('editado'));
    handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}/${row._id}`);
  };

  const handleActivate = (data) => {
    dispatch(editProject(data));
    dispatch(closeConfirmationModal());
    dispatch(setSnackbarOperation('activado'));
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
    dispatch(setSnackbarOperation('inactivado'));
    dispatch(closeConfirmationModal());
  };

  const options = {
    id: row._id,
    body: {
      isActive: true,
    },
  };

  const buttonsArray: TableButton<MappedProjectData>[] = filters.isActive
    ? [
        {
          active: true,
          testId: 'delete-button',
          variant: Variant.CONTAINED,
          onClick: (data) => {
            dispatch(openConfirmationModal());
            setRow(data);
          },
          icon: <DeleteIcon />,
        },
        {
          active: true,
          testId: 'edit-button',
          variant: Variant.CONTAINED,
          onClick: (row) => handleEdit(row),
          icon: <EditIcon />,
        },
      ]
    : [
        {
          active: true,
          label: 'Activar',
          testId: 'activate-button',
          variant: Variant.TEXT,
          onClick: (data) => {
            dispatch(openConfirmationModal());
            setRow(data);
          },
        },
      ];

  const showErrorMessage = projectError?.networkError || !projectList.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Proyectos}
      handleReload={() => handleNavigation(0)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}`)}
      error={projectError}
    />
  ) : (
    <div className={styles.tableContainer}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Proyectos</Typography>
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <SearchBar<SearchProjectData>
            setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
            filter={filters.search}
          />
        </div>
        <div className={styles.addProjectButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => {
              handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.PROJECTS_FORM}`);
              dispatch(setSnackbarOperation('agregado'));
            }}
            label={'+ Agregar proyecto'}
            testId={'add-project-button'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.checkboxInput}>
        {checked ? (
          <div className={styles.filterButtonsPressed}>
            <Button
              materialVariant={Variant.CONTAINED}
              onClick={() => {
                setFilters({ ...filters, isActive: !filters.isActive });
                setChecked(!checked);
              }}
              label={'Inactivos'}
              testId={'inactive-button'}
              color={'warning'}
            />
          </div>
        ) : (
          <div className={styles.filterButtons}>
            <Button
              materialVariant={Variant.TEXT}
              onClick={() => {
                setFilters({ ...filters, isActive: !filters.isActive });
                setChecked(!checked);
              }}
              label={'Inactivos'}
              testId={'inactive-button'}
            />
          </div>
        )}
        <select
          className={styles.filterDropdown}
          onChange={(e) => {
            setFilters({ ...filters, criticality: e.target.value });
          }}
        >
          <option
            value={''}
            disabled
            selected={filters.criticality === ''}
            className={styles.option}
          >
            {'Criticidad'}
          </option>
          {optionsIsCritic?.map((item) => (
            <option key={item.value} value={item.value} className={styles.option}>
              {item.label}
            </option>
          ))}
        </select>
        <div className={styles.filterButtons}>
          <Button
            materialVariant={Variant.TEXT}
            onClick={() => {
              setFilters({ isActive: true, criticality: '', search: '' });
              setChecked(false);
            }}
            label={'Resetear filtros'}
            testId={'reset-filter'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {dataList?.length ? (
          <Table<MappedProjectData>
            showButtons
            testId={'project-table'}
            headers={projectHeaders}
            value={dataList}
            setDataList={setDataList}
            buttons={buttonsArray}
            isActive={filters.isActive}
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
        operation={snackbarOperation}
      />
      <Modal
        testId="deleteModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={confirmationDescription}
          title={confirmationTitle}
          handleConfirm={() => (filters.isActive ? handleDelete(row._id) : handleActivate(options))}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default Projects;
