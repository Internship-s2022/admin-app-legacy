import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import DeleteIcon from 'src/components/shared/ui/icons/tableIcons/deleteIcon';
import EditIcon from 'src/components/shared/ui/icons/tableIcons/editIcon';
import { deleteMember } from 'src/redux/member/thunk';
import { openModal, setSnackbarOperation } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';
import { dateFormatter } from 'src/utils/formatters';

import { headerMemberTable } from './constants';
import styles from './memberTable.module.css';
import EmptyMemberMessage from './noMembers';
import { MemberTableProps } from './types';

const MemberTable = (props: MemberTableProps) => {
  const dispatch: AppDispatch<null> = useDispatch();

  const { list, setMemberId, projectId } = props;

  const filteredList = list.filter((item) => item?.active);

  const newList = filteredList.map((item) => {
    const currentHelper = item.helper?.find((helper) => helper.isActive);
    return {
      id: item._id,
      employee: `${item?.employee?.user?.firstName} ${item?.employee?.user?.lastName}` || '-',
      role: item?.role || '-',
      dedication: item?.memberDedication || '-',
      helper: currentHelper
        ? `${currentHelper.helperReference?.user?.firstName} ${currentHelper.helperReference?.user?.lastName}`
        : '-',
      date: dateFormatter(item?.startDate, item?.endDate),
    };
  });

  const handleDelete = (id) => {
    dispatch(deleteMember(id));
    dispatch(setSnackbarOperation('borrado'));
  };

  const handleEdit = (id) => {
    setMemberId(id);
    dispatch(openModal());
    dispatch(setSnackbarOperation('editado'));
  };

  const handleAdd = () => {
    setMemberId('');
    dispatch(openModal());
    dispatch(setSnackbarOperation('agregado'));
  };

  return list?.length ? (
    <div className={styles.tableContainer}>
      <div className={styles.addMembers}>
        Agregar miembros
        <Button
          testId="addMember"
          materialVariant={Variant.CONTAINED}
          onClick={() => handleAdd()}
          label="+ Agregar miembros"
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {headerMemberTable?.map((header, index) => {
              return (
                <th className={styles.header} key={index}>
                  {header.header}
                </th>
              );
            })}
            <th className={styles.header}></th>
          </tr>
        </thead>
        <tbody>
          {newList?.map((data) => {
            return (
              <tr key={data.id}>
                {headerMemberTable.map((header, index) => {
                  return (
                    <td className={styles.rows} key={index}>
                      {data[header.key]}
                    </td>
                  );
                })}
                <td className={`${styles.buttons} ${styles.rows}`}>
                  <div>
                    <IconButton
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(data.id)}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <EmptyMemberMessage projectId={projectId} />
  );
};

export default MemberTable;
