import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import { deleteMember } from 'src/redux/member/thunk';
import { openModal } from 'src/redux/ui/actions';
import { AppDispatch } from 'src/types';
import { dateFormatter } from 'src/utils/formatters';

import { headerMemberTable } from './constants';
import styles from './memberTable.module.css';
import { MemberTableProps } from './types';

const MemberTable = (props: MemberTableProps) => {
  const dispatch: AppDispatch<null> = useDispatch();

  const { list, setMemberId } = props;

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
  };

  const handleEdit = (id) => {
    setMemberId(id);
    dispatch(openModal());
  };

  const handleAdd = () => {
    setMemberId('');
    dispatch(openModal());
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
                    <Button
                      testId="deleteButton"
                      materialVariant={Variant.OUTLINED}
                      onClick={() => handleDelete(data.id)}
                      label="X"
                    />
                    <Button
                      testId="editButton"
                      materialVariant={Variant.OUTLINED}
                      onClick={() => handleEdit(data.id)}
                      label="Editar"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className={styles.emptyMember}>
      <div>Este proyecto no cuenta con miembros asociados</div>
      <div className={styles.messageContainer}>
        <p>Para agregar un nuevo miembro al proyecto,</p>
        <p>clickee en agregar miembro</p>
      </div>
      <div className={styles.addMemberButton}>
        <Button
          testId="addMember"
          materialVariant={Variant.CONTAINED}
          onClick={() => dispatch(openModal())}
          label="+ Agregar Miembro"
        />
      </div>
    </div>
  );
};

export default MemberTable;
