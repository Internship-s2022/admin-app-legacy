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
import {
  closeConfirmationModal,
  closeMessageAlert,
  closeModal,
  openConfirmationModal,
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
  console.log('listInFilter', list);
  console.log('filters', filters);

  filterDataList = list.filter((item) => item.active === filters.isActive);

  console.log('filterdataList', filterDataList);

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

  const projectError = useSelector((state: RootState) => state.project?.error);
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const dispatch: AppDispatch<null> = useDispatch();
  const [dataList, setDataList] = useState([]);
  const projectList = useSelector((state: RootState) => state.project.list);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const [filters, setFilters] = React.useState({
    isActive: true,
    criticality: '',
    search: '',
  });
  const [checked, setChecked] = React.useState(false);

  const activeProjectsList = useMemo(() => {
    const formattedProjectList = projectList.map((project) => ({
      ...project,
      members: project.members.map((member) => ({
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

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setDataList(activeProjectsList);
  }, [projectList, filters.isActive, filters.criticality, filters.search]);

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

  const showErrorMessage = projectError?.networkError || !projectList.length;

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
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <SearchBar<SearchProjectData>
            setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
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
              testId={'inactiveButtons'}
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
              testId={'inactiveButtons'}
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
            }}
            label={'Resetear filtros'}
            testId={'resetFilter'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {dataList?.length ? (
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
